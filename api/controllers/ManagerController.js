/**
 * ManagerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const Joi = require('joi');
const uuidv1 = require('uuid/v1');

module.exports = {


    // GET /task/getAllTask
    "getAllTask": async (req, res)=> {
        try {
            where = {
                created_by : req.param('createdBy')
            }
            let tasks = await Tasks.find({
                select: ['id', 'description', 'task_location', 'created_by', 'created_at', 'updated_at', 'assigned_to', 'deadline', 'task_attachment_link', 'task_status'],
                where: where
            });
            res.ok({"data": tasks});
        } catch (error) {
            sails.log.error(error)
            res.serverError({"err": "Oops! Something went wrong in getAllTask api!"});
        }
    },
    
    //POST /task/createTask
    "createTask": async (req, res)=> {
        try {
            let request = {
                description : req.body.description,
                task_location: req.body.taskLocation,
                created_by: req.body.createdBy,
                assigned_to: req.body.assignedTo,
                deadline: req.body.deadline,
                task_attachment_link: req.body.taskAttachmentLink
            }   
            
            console.log(request)

            const schema = Joi.object().keys({
                description: Joi.string ().required(),
                task_location: Joi.string().required(),
                created_by: Joi.string().required(),
                assigned_to: Joi.string().empty(null).allow(null),
                deadline: Joi.number().required(),
                task_attachment_link: Joi.string().allow('')
            });

            const validateResult = Joi.validate(request, schema);

            if (validateResult.error !== null) {
                return res.badRequest({"err": "Something wrong, please try again!"})
            }

            if (!request.assigned_to || request.assigned_to == '')  request['task_status'] = 1;

            request['id'] = uuidv1();
            await Tasks.create(request);
            return res.ok("Task has been created");
        } catch (error) {
            sails.log.error(error)
            return res.serverError({"err": "Oops! Something went wrong in createTask api!"});
        }
    },

    // POST /task/assignTask
    "assignTask": async (req, res)=> {
        try {
            let request = {
                id : req.body.id,
                assigned_to: req.body.assignedTo
            }   
            
            const schema = Joi.object().keys({
                id: Joi.string().required(),
                assigned_to: Joi.string().required(),
            });

            const validateResult = Joi.validate(request, schema);

            if (validateResult.error !== null) {
                return res.badRequest({"err": "Something wrong, please try again!"})
            }

            await Tasks.update({
                id: request.id
            }, {
                assigned_to: request.assigned_to, 
                task_status: 1
            });
            
            return res.ok("Task has been assigned succesfully");
        } catch (error) {
            sails.log.error(error)
            res.serverError({"err": "Oops! Something went wrong in assignTask api!"});
        }
    },
};

