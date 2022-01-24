const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChannelModel } = require('../helpers/db');
const { ownerId,targetChannelIds } = require('../config.json');

const deniedReply = {
	content: '🚫 Please contact this bot\'s owner for registering channel for broadcasting.',
	ephemeral: true
}

const errorReply = {
	content: `❌ Something went wrong while executing this command.`,
	ephemeral: true
}

const disabledReply = {
	content: `🚫 Registeration has been disabled for channels has been set up in configuration file.`,
	ephemeral: true
}

async function register(interaction) {
	if (targetChannelIds) {
		return interaction.reply(disabledReply);
	}
	try {
		const channel = await ChannelModel.create({
			id: interaction.channelId
		});

		return interaction.reply({
			content: `✅ Channel "${interaction.channel}" has registered.`,
			ephemeral: true
		});
	}
	catch (error) {
		if (error.name === 'SequelizeUniqueConstraintError') {
			return interaction.reply({
				content: `⭕️ Channel "${interaction.channel}" has been registered.`,
				ephemeral: true
			});
		}
		console.error(error);
		return interaction.reply(errorReply);

	}
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('Register a channel for receiving notifications.'),
	async execute(interaction) {
		if (interaction.user.id == ownerId) {
			// console.log(`✅ User ${interaction.user.tag} has permission to register channels.`);
			await register(interaction);
		} else {
			// console.log(`❎ User ${interaction.user.tag} doesn't have permission to register channels.`);
			await interaction.reply(deniedReply);
		}
	},
};