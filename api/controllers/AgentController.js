/**
 * AgentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const Joi = require('joi');
module.exports = {
    // POST /task/changeTaskStatus
    "changeTaskStatus": async (req, res)=> {
        try {
            let request = {
                id : req.body.id,
                task_status: req.body.taskStatus
            }   
            
            const schema = Joi.object().keys({
                id: Joi.string().required(),
                task_status: Joi.number().required(),
            });

            const validateResult = Joi.validate(request, schema);

            if (validateResult.error !== null) {
                return res.badRequest({"err": "Something wrong, please try again!"})
            }

            await Tasks.update({
                id: request.id
            }, {
                task_status: request.task_status
            });
        } catch (error) {
            sails.log.error(error)
            res.serverError({"err": "Oops! Something went wrong in assignTask api!"});
        }
    },

    // GET /task/getAssignedTask
    "getAssignedTask": async (req, res)=> {
        try {
            let request = {
                assigned_to : req.param('assignedTo')
            }   
            
            const schema = Joi.object().keys({
                assigned_to : Joi.string().required()
            });

            const validateResult = Joi.validate(request, schema);

            if (validateResult.error !== null) {
                return res.badRequest({"err": "Something wrong, please try again!"})
            }

            let where = {assigned_to: request.assigned_to}

            let data = await Tasks.find({
                select: ['id', 'description', 'task_location', 'created_by', 'assigned_to', 'deadline', 'task_attachment_link', 'task_status'],
                where: where
            });

            res.ok(data)

        } catch (error) {
            sails.error(error)
            res.serverError({"err": "Oops! Something went wrong in assignTask api!"});
        }
    }

};

