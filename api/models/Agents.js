/*
* Agents.js
* @description :: A model for storing all Agents details
*/

module.exports = {
    tableName: 'agents',
    attributes: {
        id: {
            type: "string",
            required: true,
            columnType: "varchar(255) NOT NULL"
        },
        name: {
            type: "string",
            required: true,
            columnType: "varchar(255) NOT NULL"
        },
        email: {
            type: "string",
            required: false,
            columnType: 'citext NOT NULL'
        },
        password: {
            type: "string",
            required: false,
            columnType: 'varchar(127) NOT NULL'
        },
        manager_id: {
            type: "string",
            required: false,
            columnType: 'citext NOT NULL'
        },
        specialization: {
            type: "string",
            required: false,
            columnType: 'varchar(127) NOT NULL'
        },
        contact_number: {
            type: "string",
            required: false,
            columnType: 'varchar(15) NOT NULL'
        },
        verification_doc_link: {
            type: "string",
            required: false,
            columnType: 'varchar(127) DEFAULT NULL'
        },
        verification_status: {
            type: "boolean",
            required: false,
            defaultsTo: true,
            columnType: "boolean DEFAULT FALSE"
        },
        deleted_at: {
            type: "ref",
            required: false,
            columnType: "timestamp(0) DEFAULT NULL"
        },
    }
};