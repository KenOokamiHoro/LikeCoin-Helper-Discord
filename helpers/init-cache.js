const { update_proposal_statuses } = require("./update");
const { apiEndpoint } = require("../config.json");
const {ProposalModel } = require("./db");

ProposalModel.sync().then(v => {
    update_proposal_statuses(apiEndpoint, client = undefined, slient = true);
});