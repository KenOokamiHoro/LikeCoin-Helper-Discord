const { MessageActionRow, MessageSelectMenu } = require('discord.js');

function buildSelects(id, description, options) {
    return new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId(id)
                .setPlaceholder(description)
                .addOptions(options),
        );
}

function buildProposalLists(id,proposals) {
    let options = Array();
    proposals.forEach(function (element) {
        options.push({
            label: `Proposal ${element.proposal_id}`,
            description: `${element.content.title.slice(0, 90)}...`,
            value: element.proposal_id
        });
    })
    return buildSelects(id,'Select a proposal to get details.',options);
}

module.exports = {
    buildProposalLists
}