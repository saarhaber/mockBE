const Interveiw_routes = require('express').Router()
const Interveiws = require('../database/models/interviews')

Interveiw_routes.get('/', (req, res) => {
    Interveiws.findAll()
    .then(data => res.send(data))
})

module.exports = Interveiw_routes