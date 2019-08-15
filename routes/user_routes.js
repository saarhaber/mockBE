const user_routes = require('express').Router()
const users = require('../database/models/users')

user_routes.get('/', (req, res) => {
    users.findAll()
    .then(res => console.log(res))
})

module.exports = user_routes