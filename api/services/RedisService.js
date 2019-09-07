const Redis = require('redis');
const redisClient = Redis.createClient({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST
});

redisClient.on('error', function (err) {
    console.error('Redis error:', err);
});

module.exports = {

    /**
     * Insert data in redis
     */

    setData: (key, value, time)=> {
        redisClient.set(key, JSON.stringify(value));
        if (time) {
            redisClient.expire(key, time);
        }
    },

    /**
     * Fetch data from redis
     */
    getData: async (key)=> {
        return new Promise((resolve, reject) => {
            redisClient.get(key, function (err, result) {
                if (err) reject(err);
                if (result) {
                    resolve(JSON.parse(result))
                } else {
                    reject()
                }
            });
        });
    },

    /**
     * Remove redis data
     */
    removeData: (key)=> {
        return new Promise((resolve, reject) => {
            redisClient.del(key, function (err, result) {
                if (err) reject(err);
                resolve(JSON.parse(result));
            });
        });
    },
}