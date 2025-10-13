
function responseError(res, status = 500, message = "Une erreur est survenue") {
    return res.status(status).json({ success: false, error: message });
}

function responseBadReq(res, status = 400, message = "Requête invalide") {
    return res.status(status).json({ success: false, error: message });
}

function responseSuccess(res, data, status = 200) {
    return res.status(status).json({ success: true, data });
}


module.exports = { responseError, responseBadReq, responseSuccess };