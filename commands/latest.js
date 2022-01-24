const { SlashCommandBuilder } = require('@discordjs/builders');
const { apiEndpoint } = require('../config.json');
const { fetch_proposals, describe_proposal } = require('../helpers/proposals');

async function latest_proposal(apiEndpoint, interaction) {
    let proposals = await fetch_proposals(apiEndpoint = apiEndpoint);
    if (!proposals) {
        interaction.reply('😪 Here is no proposal available.');
    } else {
        const latest = proposals.pop();
        interaction.reply(describe_proposal(latest));
    }

}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('latest')
        .setDescription('Get latest proposal.'),
    async execute(interaction) {
        await latest_proposal(apiEndpoint, interaction);
    }
}