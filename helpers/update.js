const { fetch_proposals } = require("./proposals")
const { ProposalModel} = require('../helpers/db');
const { status_to_emoji } = require("./statuses")
const { bold, blockQuote, } = require('@discordjs/builders');
const { targetChannelIds, maxDescriptionLength } = require("../config.json");
const { update_descriptions, more_information } = require("./const_texts");
const { proposal_action_row } = require("./action_row")

function build_announcement(proposal) {
    // Build announcement text on proposal update.
    const status = proposal.status;
    let title = bold(`${proposal.messages[0].content.title}`);
    let description = proposal.messages[0].content.description;
    var text;
    if (description.length > maxDescriptionLength) {
        text = `${title}\n${description.substring(0, maxDescriptionLength)}...`
    } else {
        text = `${title}\n${description}`
    }
    const message = `\n${status_to_emoji(status)} Proposal ${proposal.id} ${update_descriptions[status]}
${blockQuote(`${text}`)}

${more_information[status]}
@everyone
`

    return {
        content: message,
        ephemeral: false,
        components: [
            proposal_action_row(proposal)
        ]
    }
}

async function update_proposal_statuses(apiEndpoint, client, slient = false) {
    const proposals = await fetch_proposals(apiEndpoint = apiEndpoint);
    proposals.forEach(proposal => {
        update_proposal(apiEndpoint, proposal, client, slient);
    })
}

async function update_proposal(apiEndpoint, proposal, client = undefined, slient = false) {
    // Update proposal statuses in updateInterval.
    // If slient is set (used in initialize caches), 
    // it will no messages send to target channel but leave logs on console.
    if (!slient) {
        channels = []
        targetChannelIds.forEach(id => {
            channels.push(client.channels.cache.get(id))
        });
    }
    const cached = await ProposalModel.findByPk(proposal.id);
    if (cached) {
        if (!(cached.status == proposal.status)) {
            ProposalModel.update({
                status: proposal.status,
                submit_time: proposal.submit_time,
                deposit_end_time: proposal.deposit_end_time,
                voting_start_time: proposal.voting_end_time,
                voting_end_time: proposal.voting_end_time
            }, { where: { id: proposal.id } }).then(response => {
                if (!slient) {
                    channels.forEach(channel => {
                        channel.send(build_announcement(proposal));
                    })
                }
                console.log(`Updated proposal ${response.id}.`)
            })
        } else {
            console.log(`Proposal ${proposal.id} is not changed.`)
        }
    } else {
        if (proposal.messages.length > 0) {
            ProposalModel.create({
                id: proposal.id,
                title: proposal.messages[0].content.title,
                type: proposal.messages[0].content['@type'],
                description: proposal.messages[0].content.description,
                status: proposal.status,
                submit_time: proposal.submit_time,
                deposit_end_time: proposal.deposit_end_time,
                voting_start_time: proposal.voting_end_time,
                voting_end_time: proposal.voting_end_time
            }).then(response => {
                if (!slient) {
                    channels.forEach(channel => {
                        channel.send(build_announcement(proposal));
                    })
                }
                console.log(`Cached new proposal ${response.id}.`)
            })
        } else {
            ProposalModel.create({
                id: proposal.id,
                status: proposal.status,
                submit_time: proposal.submit_time,
                deposit_end_time: proposal.deposit_end_time,
                voting_start_time: proposal.voting_end_time,
                voting_end_time: proposal.voting_end_time
            }).then(response => {
                console.log(`Skipped empty or invaild proposal ${response.id}.`)
            })
        }

    }
}

module.exports = {
    update_proposal_statuses
}