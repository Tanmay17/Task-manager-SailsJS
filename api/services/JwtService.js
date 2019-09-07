const jwt = require('jsonwebtoken');
const privateKey = sails.config.session.secret;

module.exports = {
    "issueToken": async (emailId, role, accessId)=> {
            let payload = {
                emailId,
                role,
                accessId
            };

            jwt.sign(payload, privateKey, { algorithm: 'RS256' }, (err, token)=> {
                if(err) {
                    sails.error(err);
                    return {"err": "Some Error Ocurred while issuing Token"};
                }
                sails.log(token);
                RedisService.setData(payload.access_id, payload);
                return token;
            });
    },

    "verifyToken": (token, callback)=> {
        jwt.verify(token, JwtSecret, (err, decoded) => {

            if (err) return callback(err);
            RedisService.getData(decoded.access_id).then((payload) => {
                return callback(null, payload);
            }).catch(() => {
                return callback(true);
            });

        });
    },
};