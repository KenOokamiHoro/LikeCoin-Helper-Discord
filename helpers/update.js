const { fetch_proposals } = require("./proposals")
const { ProposalModel, StatusModel } = require('../helpers/db');
const { status_to_emoji } = require("./statuses")
const { MessageActionRow, MessageButton } = require('discord.js');
const { bold, blockQuote, channelMention } = require('@discordjs/builders');
const { targetChannelIds, discussChannelId, maxDescriptionLength } = require("../config.json");

function discussion_channel(discussChannelId) {
    /* Mention a channel for discussion if specified. */
    if (discussChannelId) {
        return `Releated discussions on ${channelMention(discussChannelId)}`
    } else {
        return ''
    }
}

const update_descriptions = {
    "PROPOSAL_STATUS_DEPOSIT_PERIOD": "has been raised and in Deposit Period. ",
    "PROPOSAL_STATUS_VOTING_PERIOD": "has been collected enough deposits and in Voting Period.",
    "PROPOSAL_STATUS_PASSED": "has been Passed. Thank you all who voted it! :thumbsup:",
    "PROPOSAL_STATUS_REJECTED": "has been Rejected.",
};
const bigdipper_tips = {
    "PROPOSAL_STATUS_DEPOSIT_PERIOD": "View more information on BigDipper",
    "PROPOSAL_STATUS_VOTING_PERIOD": "View more information on BigDipper",
    "PROPOSAL_STATUS_PASSED": "View tally result on BigDipper",
    "PROPOSAL_STATUS_REJECTED": "View tally result on BigDipper",
};
const stake_like_co_tips = {
    "PROPOSAL_STATUS_DEPOSIT_PERIOD": "Deposit on dao.like.co",
    "PROPOSAL_STATUS_VOTING_PERIOD": "Vote on dao.like.co",
    "PROPOSAL_STATUS_PASSED": "View tally result on dao.like.co",
    "PROPOSAL_STATUS_REJECTED": "View tally result on dao.like.co",
}

const mintscan_tips = {
    "PROPOSAL_STATUS_DEPOSIT_PERIOD": "View more information on Mintscan",
    "PROPOSAL_STATUS_VOTING_PERIOD": "View more information on Mintscan",
    "PROPOSAL_STATUS_PASSED": "View tally result on Mintscan",
    "PROPOSAL_STATUS_REJECTED": "View tally result on Mintscan",
}

const more_information = {
    "PROPOSAL_STATUS_DEPOSIT_PERIOD": discussion_channel(discussChannelId),
    "PROPOSAL_STATUS_VOTING_PERIOD": discussion_channel(discussChannelId),
    "PROPOSAL_STATUS_PASSED": "",
    "PROPOSAL_STATUS_REJECTED": "",
}

function build_announcement(proposal) {
    // Build announcement text on proposal updates
    const status = proposal.status;
    let title = bold(`${proposal.content.title}`);
    let description = proposal.content.description;
    var text;
    if (description.length > maxDescriptionLength) {
        text = `${title}\n${description.substring(0, maxDescriptionLength)}...`

    } else {
        text = `${title}\n${description}`

    }
    const message = `\n${status_to_emoji(status)} Proposal ${proposal.proposal_id} ${update_descriptions[status]}
${blockQuote(`${text}`)}

${more_information[status]}
@everyone
`
    return {
        content: message,
        ephemeral: false,
        components: [new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel(`${bigdipper_tips[status]}`)
                    .setStyle('LINK')
                    .setURL(`https://bigdipper.live/likecoin/proposals/${proposal.proposal_id}`),
            ).addComponents(
                new MessageButton()
                    .setLabel(`${mintscan_tips[status]}`)
                    .setStyle('LINK')
                    .setURL(`https://www.mintscan.io/likecoin/proposals/${proposal.proposal_id}`),
            ).addComponents(
                new MessageButton()
                    .setLabel(`${stake_like_co_tips[status]}`)
                    .setStyle('LINK')
                    .setURL(`https://dao.like.co/proposals/${proposal.proposal_id}`),
            )]
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
        console.log(proposal.messages);
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
                if (!slient) {
                    channels.forEach(channel => {
                        channel.send(build_announcement(proposal));
                    })
                }
                console.log(`Cached new proposal ${response.id}.`)
            })
        }

    }
}

module.exports = {
    update_proposal_statuses
}