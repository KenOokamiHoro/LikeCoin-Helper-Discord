function status_to_text(status) {
    let reference = {
        "PROPOSAL_STATUS_UNSPECIFIED": "❔ [Unspecified]",
        "PROPOSAL_STATUS_DEPOSIT_PERIOD":"📝 [Depositing]", 
        "PROPOSAL_STATUS_VOTING_PERIOD":"🗳️ [Voting]",
        "PROPOSAL_STATUS_PASSED":"✅ [Passed]",
        "PROPOSAL_STATUS_REJECTED":"🚫 [Rejected]",
        "PROPOSAL_STATUS_FAILED":"❎ [Failed]"
    };
    return reference[status];
}

function status_to_emoji(status) {
    let reference = {
        "PROPOSAL_STATUS_UNSPECIFIED": "❔ ",
        "PROPOSAL_STATUS_DEPOSIT_PERIOD":"📝 ", 
        "PROPOSAL_STATUS_VOTING_PERIOD":"🗳️ ",
        "PROPOSAL_STATUS_PASSED":"✅ ",
        "PROPOSAL_STATUS_REJECTED":"🚫 ",
        "PROPOSAL_STATUS_FAILED":"❎ "
    };
    return reference[status];
}

module.exports = {
    status_to_text,
    status_to_emoji
}