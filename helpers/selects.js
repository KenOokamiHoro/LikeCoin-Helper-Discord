const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

function buildSelects(id, description, options) {
    return new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId(id)
                .setPlaceholder(description)
                .addOptions(options),
        );
}

function buildProposalLists(id, proposals) {
    let options = Array();
    proposals.forEach(function (element) {
        // console.log(element);
        if (element.messages.length > 0) {
            options.push({
                label: `Proposal ${element.id}`,
                description: `${element.messages[0].content.title.slice(0, 90)}...`,
                value: element.id
            });
        }
    })
    return buildSelects(id, 'Select a proposal to get details.', options);
}

module.exports = {
    buildProposalLists
}