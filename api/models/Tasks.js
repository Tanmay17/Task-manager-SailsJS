/*
* Tasks.js
* @description :: A model for storing all Tasks details
*/

module.exports = {
    tableName: 'tasks',
    attributes: {
        id: {
            type: "string",
            required: true,
            columnType: "varchar(255) NOT NULL"
        },
        description: {
            type: "string",
            required: true,
            columnType: "varchar(255) NOT NULL"
        },
        task_location: {
            type: "string",
            required: true,
            columnType: 'varchar(255) NOT NULL'
        },
        created_by: {
            type: "string",
            required: true,
            columnType: 'varchar(50) NOT NULL'
        },
        assigned_to: {
            type: "string",
            required: false,
            columnType: 'varchar(50) DEFAULT NULL'
        },
        deadline: {
            type: "number",
            required: true,
            columnType: "int NOT NULL"
        },
        task_attachment_link: {
            type: "string",
            required: false,
            columnType: 'varchar(127) DEFAULT NULL'
        },
        task_status: {
            type: "number",
            required: false,
            columnType: "smallint DEFAULT 0"
        },
    }
};