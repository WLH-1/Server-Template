
const { client } = require("../app")
const redis = require("redis")
module.exports = {
    getRedies: async (key) => {
        return await new Promise((resolve) => {
            client.get(key, (err, value) => {
                resolve(value)
            })
        })
    },
    setRedies: async (key, value) => {
        return await new Promise((resolve) => {
            client.set(key, value, resolve);
        })
    },
    deleteRedies: async (key) => {
        return await new Promise((resolve) => {
            client.del(key, resolve)
        })
    },
    getSetMember: async (key) => {
        return await new Promise((resolve) => {
            client.smembers(key, (err, data) => {
                resolve(data)
            })
        })
    },
    saddSet: async (key, value) => {
        return await new Promise((resolve) => {
            client.sadd(key, value, (err, data) => {
                resolve(data)
            })
        })
    },
    sremSet: async (key, value) => {
        return await new Promise((resolve) => {
            client.srem(key, value, (err, data) => {
                resolve(data)
            })
        })
    },
}