/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  "login": async (req, res)=> {
    try {
        sails.log.info("====================== LOGIN : Login REQUEST ==============================\n");
        sails.log.info("REQ BODY :", req.body);

        const email = req.body.email;
        const password = req.body.password;
        const role = req.body.role;

        const schema = Joi.object().keys({
            email: Joi.string().email({minDomainAtoms: 2}).required(),
            password: Joi.string().required(),
            role: Joi.string().required(),
        });

        const validateResult = Joi.validate(adminRequest, schema);

        if (validateResult.error !== null) {
            return res.badRequest({"err": "Something wrong, please try again!"});
        }
        
        let details;
        switch(role){
            case "manager":
                details = await Managers.find({
                    select: ['id', 'email', 'status', 'password'],
                    where: {email: email, status: true},
                    limit: 1,
                });
            case "agent":
                    details = await Agents.find({
                        select: ['id', 'email', 'status', 'password'],
                        where: {email: email, status: true},
                        limit: 1,
                    });
        }

        if (!_.isEmpty(details)) {
            details = details[0];

            if (details.password === password) {

                const accessId = Constants.prefixAccessId.SUPER_ADMIN + (details.id + "").padStart(6, '0');
                const jwtToken = await JwtService.issueToken(details.email, role, accessId);

                details = _.omit(details, ['password']);

                const response = {
                    access_token: jwtToken.accessToken,
                    user: details,
                };

                sails.log.info("RESPONSE :", response);

                return res.ok(response)

            } else {
                return res.badRequest({"err": "Username or password is wrong."});
            }
        } else {
            return res.badRequest({"err": "Username or password is wrong."});
        }
        
    } catch (error) {
        sails.error(error)
        res.serverError({"err": "Oops! Something went wrong in login api!"});
    }
  }
};

