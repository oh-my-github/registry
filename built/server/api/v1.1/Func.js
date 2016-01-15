function getOwner(baseUrl) {
    var res = baseUrl.split('/');
    return res[3];
}
exports.getOwner = getOwner;
function handleError(res, err) {
    return res.status(500).send(err);
}
exports.handleError = handleError;
