const { fetch } = require('undici');
const { status_to_text } = require('./statuses');
const { MessageActionRow, MessageButton } = require('discord.js');
const { bold, blockQuote } = require('@discordjs/builders');


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
    console.log(json);
    return json
}

function describe_proposal(proposal) {
    let title = bold(`${status_to_text(proposal.status)} Proposal ${proposal.proposal_id} - ${proposal.content.title}`);
    let text = `${title}
${proposal.content.description}`
    return {
        content: blockQuote(text),
        ephemeral: false,
        components: [new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('BigDipper')
                    .setStyle('LINK')
                    .setURL(`https://likecoin.bigdipper.live/proposals/${proposal.proposal_id}`),
            ).addComponents(
                new MessageButton()
                    .setLabel(`Mintscan`)
                    .setStyle('LINK')
                    .setURL(`https://www.mintscan.io/likecoin/proposals/${proposal.proposal_id}`),
            ).addComponents(
                new MessageButton()
                    .setLabel(`LikeCoin DAO`)
                    .setStyle('LINK')
                    .setURL(`https://dao.like.co/proposals/${proposal.proposal_id}`),
            )]
    }
}

module.exports = {
    fetch_proposal,
    fetch_proposals,
    describe_proposal
}