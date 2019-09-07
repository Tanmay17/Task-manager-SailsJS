/*
	Environment for Testing
*/

module.exports = {
    // configuration for testing purposes
    datastores: {
        default: {
            adapter: 'sails-postgresql',
            url: process.env.POSTGRESQL_URL,
            port: process.env.POSTGRESQL_PORT,
            charset: process.env.CHARSET,
            timezone: process.env.TIMEZONE,
            pool: true,
            connectionLimit: process.env.POSTGRESQL_CONNECTION_LIMIT,
        },
    },
    models: {
        migrate: 'safe',
        attributes: {
            created_at: {
                type: 'ref',
                autoCreatedAt: true,
                columnType: 'timestamp(0) NOT NULL DEFAULT LOCALTIMESTAMP(0)',
            },
            updated_at: {
                type: 'ref',
                autoUpdatedAt: true,
                columnType: ' timestamp(0) NOT NULL DEFAULT LOCALTIMESTAMP(0)',
            },
        },
	},
	log: {
		level: 'info'
	},
	hooks: {
		grunt: false
	},
	sockets: {
		beforeConnect: function(handshake, proceed) {

            // `true` allows the socket to connect.
            // (`false` would reject the connection)
            return proceed(undefined, true);

        },
    }
}
