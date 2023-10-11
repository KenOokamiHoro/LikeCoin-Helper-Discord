const { ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { bigdipper_tips, mintscan_tips, stake_like_co_tips } = require("./const_texts");

function proposal_action_row(proposal) {
    const bigdipper = new ButtonBuilder()
        .setLabel(`${bigdipper_tips[proposal.status]}`)
        .setStyle('Link')
        .setURL(`https://bigdipper.live/likecoin/proposals/${proposal.proposal_id}`);

    const mintscan = new ButtonBuilder()
        .setLabel(`${mintscan_tips[proposal.status]}`)
        .setStyle('Link')
        .setURL(`https://www.mintscan.io/likecoin/proposals/${proposal.proposal_id}`);

    const stake_like_co = new ButtonBuilder()
        .setLabel(`${stake_like_co_tips[proposal.status]}`)
        .setStyle('Link')
        .setURL(`https://dao.like.co/proposals/${proposal.proposal_id}`);

    return new ActionRowBuilder()
    .addComponents(bigdipper, mintscan, stake_like_co)
}

module.exports = {
    proposal_action_row
}