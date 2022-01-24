const { SlashCommandBuilder } = require('@discordjs/builders');
const { apiEndpoint } = require('../config.json');
const { fetch_proposal,describe_proposal} = require("../helpers/proposals");

const active_statuses = Array('PROPOSAL_STATUS_DEPOSIT_PERIOD', 'PROPOSAL_STATUS_VOTING_PERIOD');

async function proposal(apiEndpoint, interaction) {
	let id = interaction.options.getString('id');
	actives = await fetch_proposal(apiEndpoint = apiEndpoint,proposal_id=id);
	if (actives.proposal) {
		await interaction.reply(describe_proposal(actives.proposal));
	} else {
		interaction.reply({ content: `😪 Could not found proposal ${id}.`, ephemeral: true });
	}

}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('proposal')
		.setDescription('Get information about one proposal.')
		.addStringOption(option =>
			option.setName('id')
				.setDescription('The number of the proposal which you want to query.')
				.setRequired(true)),
	async execute(interaction) {
		await proposal(apiEndpoint, interaction);
	}
}