module.exports = function (req, res, next) {
    let token;

    if (req.headers && req.headers.authorization) {
        const parts = req.headers.authorization.split(' ');
        if (parts.length === 2) {
            const scheme = parts[0],
                credentials = parts[1];

            if (/^Bearer$/i.test(scheme)) {
                token = credentials;
            }
        } else {
            return res.badrequest({"err": "Format is Authorization: Bearer [token]"});
        }
    } else if (req.param('access_token')) {
        token = req.param('access_token');
    } else {
        return res.badrequest({"err": "No authorization header was found"});
    }

    JwtService.verifyToken(token, function (err, payload) {
        sails.log.verbose("JWT VERIFICATION : ERROR, PAYLOAD :", err, payload);
        if (err) return res.badrequest({"err": "Invalid session! Please login again!"});
        req.access_token = token;
        req.session_data = payload;
        next();
    });

};