const { SlashCommandBuilder } = require('@discordjs/builders');
const { apiEndpoint } = require('../config.json');
const { fetch_proposals } = require("../helpers/proposals");
const { buildProposalLists } = require('../helpers/selects');

const active_statuses = Array('PROPOSAL_STATUS_DEPOSIT_PERIOD', 'PROPOSAL_STATUS_VOTING_PERIOD');

async function active_proposals(apiEndpoint, interaction) {
	actives = await fetch_proposals(apiEndpoint = apiEndpoint,statuses=active_statuses);
	if (actives) {
		let message = `Active proposals: ${actives.length}`
		await interaction.reply({ content: message, components: [buildProposalLists('selectProposals',actives)] });
	} else {
		interaction.reply('😪 Here is no proposal.');
	}

}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('actives')
		.setDescription('List depositing and voting proposals.'),
	async execute(interaction) {
		await active_proposals(apiEndpoint, interaction);
	}
}