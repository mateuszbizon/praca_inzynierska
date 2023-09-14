const authOperation = (userId, creatorId, isAdmin) => {
    if (userId !== creatorId && !isAdmin) return false;

    return true;
}

module.exports = { authOperation }