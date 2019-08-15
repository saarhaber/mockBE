const User_routes = require('express').Router()
const Users = require('../database/models/users')

User_routes.get('/', (req, res) => {
    Users.findAll()
    .then(data => res.send(data))
})

module.exports = User_routes