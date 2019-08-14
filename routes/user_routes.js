const user_routes = require('express').Router()

user_routes.get('/', (req, res) => {
    res.send("USERS HERE")
})

module.exports = user_routes