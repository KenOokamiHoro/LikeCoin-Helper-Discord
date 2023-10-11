const { channelMention } = require('@discordjs/builders');
const { discussChannelId } = require("../config.json");

function discussion_channel(discussChannelId) {
    /* Mention a channel for discussion if specified. */
    if (discussChannelId) {
        return `Releated discussions on ${channelMention(discussChannelId)}`;
    } else {
        return '';
    }
}
const update_descriptions = {
    "PROPOSAL_STATUS_DEPOSIT_PERIOD": "has been raised and in Deposit Period. ",
    "PROPOSAL_STATUS_VOTING_PERIOD": "has been collected enough deposits and in Voting Period.",
    "PROPOSAL_STATUS_PASSED": "has been Passed. Thank you all who voted it! :thumbsup:",
    "PROPOSAL_STATUS_REJECTED": "has been Rejected.",
};
const bigdipper_tips = {
    "PROPOSAL_STATUS_DEPOSIT_PERIOD": "View more information on BigDipper",
    "PROPOSAL_STATUS_VOTING_PERIOD": "View more information on BigDipper",
    "PROPOSAL_STATUS_PASSED": "View tally result on BigDipper",
    "PROPOSAL_STATUS_REJECTED": "View tally result on BigDipper",
};
const stake_like_co_tips = {
    "PROPOSAL_STATUS_DEPOSIT_PERIOD": "Deposit on dao.like.co",
    "PROPOSAL_STATUS_VOTING_PERIOD": "Vote on dao.like.co",
    "PROPOSAL_STATUS_PASSED": "View tally result on dao.like.co",
    "PROPOSAL_STATUS_REJECTED": "View tally result on dao.like.co",
};
const mintscan_tips = {
    "PROPOSAL_STATUS_DEPOSIT_PERIOD": "View more information on Mintscan",
    "PROPOSAL_STATUS_VOTING_PERIOD": "View more information on Mintscan",
    "PROPOSAL_STATUS_PASSED": "View tally result on Mintscan",
    "PROPOSAL_STATUS_REJECTED": "View tally result on Mintscan",
};
const more_information = {
    "PROPOSAL_STATUS_DEPOSIT_PERIOD": discussion_channel(discussChannelId),
    "PROPOSAL_STATUS_VOTING_PERIOD": discussion_channel(discussChannelId),
    "PROPOSAL_STATUS_PASSED": "",
    "PROPOSAL_STATUS_REJECTED": "",
};
module.exports = {
    discussion_channel,
    update_descriptions,
    bigdipper_tips, mintscan_tips, more_information, stake_like_co_tips
}