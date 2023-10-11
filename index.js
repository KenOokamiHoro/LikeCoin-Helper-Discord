const fs = require('fs');
// Require the necessary discord.js classes
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { apiEndpoint, token } = require('./config.json');
const { ProposalModel, ChannelModel, StatusModel } = require('./helpers/db');
const { fetch_proposal, describe_proposal } = require('./helpers/proposals')
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds], partials: [Partials.Channel] });

// Read Events
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

// Read Events
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.once('ready', c => {
	ProposalModel.sync();
	ChannelModel.sync();
	StatusModel.sync();
});

// Processing commands
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isSelectMenu()) return;

	if (interaction.customId === 'selectProposals') {
		let proposal = await fetch_proposal(apiEndpoint, interaction.values[0]);
		await interaction.update({ content: `/proposal ${interaction.values[0]}`, components: [] });
		await client.channels.cache.get(interaction.channelId).send((describe_proposal(proposal.proposal)));
	}
});

// Login to Discord with your client's token
client.login(token);