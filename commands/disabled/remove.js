const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChannelModel } = require('../../helpers/db');
const { ownerId } = require('../../config.json');

const deniedReply = {
	content: '🚫 Please contact this bot\'s owner for this operation.',
	ephemeral: true
}

const disabledReply = {
	content: `🚫 Registeration has been disabled for channels has been set up in configuration file.`,
	ephemeral: true
}

async function deregister(interaction) {
	if (targetChannelIds) {
		return interaction.reply(disabledReply);
	}
	const rowCount = await ChannelModel.destroy({ where: { id: interaction.channelId } });

	if (!rowCount) return interaction.reply({
		content: `❓ Channel "${interaction.channel}" is not registered for broadcasting.`,
		ephemeral: true
	});

	return interaction.reply({
		content: `✅ Channel "${interaction.channel}" has removed from broadcasting channels.`,
		ephemeral: true
	});
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('remove')
		.setDescription('Remove a channel from broadcasting.'),
	async execute(interaction) {
		if (interaction.user.id == ownerId) {
			// console.log(`✅ User ${interaction.user.tag} has permission to register channels.`);
			await deregister(interaction);
		} else {
			// console.log(`❎ User ${interaction.user.tag} doesn't have permission to register channels.`);
			await interaction.reply(deniedReply);
		}
	},
};