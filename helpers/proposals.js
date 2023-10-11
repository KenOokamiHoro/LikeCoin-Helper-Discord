const { fetch } = require('undici');
const { status_to_text } = require('./statuses');
const { bold, blockQuote } = require('@discordjs/builders');
const { proposal_action_row } = require("./action_row")


async function fetch_proposals(apiEndpoint, statuses = false) {
    /* Get proposals from LikeCoin Chain node. */
    const res = await fetch(apiEndpoint.concat('/cosmos/gov/v1/proposals'));
    const json = await res.json();
    const totals = json.proposals;
    if (statuses) {
        let actives = Array();
        totals.forEach(function (element) {
            if (statuses.findIndex(status => status === element.status) != -1) {
                actives.push(element);
            }
        });
        if (actives.length) {
            return actives;
        } else {
            return false;
        }
    } else {
        return totals;
    }
}

async function fetch_proposal(apiEndpoint, proposal_id) {
    const res = await fetch(apiEndpoint.concat('/cosmos/gov/v1/proposals/',proposal_id));
    const json = await res.json();
    return json
}

function describe_proposal(proposal) {
    let title = bold(`${status_to_text(proposal.status)} Proposal ${proposal.id} - ${proposal.messages[0].content.title}`);
    let text = `${title}
${proposal.messages[0].content.description}`
    return {
        content: blockQuote(text),
        ephemeral: true,
        components: [proposal_action_row(proposal)]
    }
}

module.exports = {
    fetch_proposal,
    fetch_proposals,
    describe_proposal
}