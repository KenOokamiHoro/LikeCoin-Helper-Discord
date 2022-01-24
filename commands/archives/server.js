const { bold, blockQuote, SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Replies with server info.'),
	async execute(interaction) {
		await interaction.reply(blockQuote(`Server name: ${bold(interaction.guild.name)}
Total members: ${bold(interaction.guild.memberCount)}`));
	},
};