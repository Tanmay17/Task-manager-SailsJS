/*
* Managers.js
* @description :: A model for storing all Managers details
*/

module.exports = {
    tableName: 'managers',
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
        contact_number: {
            type: "string",
            required: false,
            columnType: 'varchar(15) NOT NULL'
        },
    }
};