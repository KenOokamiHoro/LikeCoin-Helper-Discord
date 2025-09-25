const { ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { pingpub_tips, stake_like_co_tips } = require("./const_texts");

function proposal_action_row(proposal) {
    const pingpub = new ButtonBuilder()
        .setLabel(`${pingpub_tips[proposal.status]}`)
        .setStyle('Link')
        .setURL(`https://ping.pub/likecoin/gov/${proposal.id}`);

    const stake_like_co = new ButtonBuilder()
        .setLabel(`${stake_like_co_tips[proposal.status]}`)
        .setStyle('Link')
        .setURL(`https://dao.v2.like.co/proposals/${proposal.id}`);

    return new ActionRowBuilder()
    .addComponents(pingpub, stake_like_co)
}

module.exports = {
    proposal_action_row
}