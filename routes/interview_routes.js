const Interveiw_routes = require('express').Router()
const Interveiws = require('../database/models/interviews')

Interveiw_routes.get('/', (req, res) => {
    Interveiws.findAll()
    .then(data => res.send(data))
})

Interveiw_routes.get('/:id', async (req, res) => {
    await Interveiws.findByPk(req.params.id)
    .then(interview => res.send(interview))
    .catch(err => console.log(err))
})

module.exports = Interveiw_routes