const Sequelize = require('sequelize');

// Initial database.
const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'db.sqlite',
});

const ProposalModel = sequelize.define('Propsals', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		unique: true,
	},
	title: Sequelize.STRING,
	type: Sequelize.STRING,
	description: Sequelize.TEXT,
	status: Sequelize.STRING,
	submit_time: Sequelize.STRING,
	deposit_end_time: Sequelize.STRING,
	voting_start_time: Sequelize.STRING,
    voting_end_time: Sequelize.STRING,
	thread: Sequelize.INTEGER
});

const ChannelModel = sequelize.define('Channels', {
	id: {
		type: Sequelize.STRING,
		primaryKey: true,
		unique: true,
	}
});

const StatusModel = sequelize.define('Status', {
	updated_on: Sequelize.STRING
});

module.exports = {
	ProposalModel,
	ChannelModel,
	StatusModel
}

ProposalModel.sync();
ChannelModel.sync();
StatusModel.sync();