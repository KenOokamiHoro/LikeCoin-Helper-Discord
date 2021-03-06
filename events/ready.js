const { ChannelModel } = require('../helpers/db');
const { targetChannelIds,apiEndpoint,updateInterval } = require('../config.json');
const { update_proposal_statuses } = require("../helpers/update");

async function setupChannelDB() {
	targetChannelIds.forEach(async function (element) {
		ChannelModel.create({
			id: element
		}).then(channel => {
			console.log(`Registered channel id ${channel.id} from config.`)
		})
	}
	);
}

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		function checkUpdate(){
			update_proposal_statuses(apiEndpoint,interaction=client,slient=false);
		}
		console.log(`Connected to Discord API Server as ${client.user.tag}`);
		if (targetChannelIds) {
			ChannelModel.destroy({ truncate: true }).then(v => {
				setupChannelDB();
			});
		} else {
			console.log("targetChannelIds not exist, skipping rebuild announcement channel lists.")
		}
		checkUpdate()
		setInterval(checkUpdate, updateInterval*1000);
	},
};