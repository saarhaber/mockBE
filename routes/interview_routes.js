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

Interveiw_routes.post("/", async (req, res) => {
    console.log(req.body)
    await Interveiws.create({
        dateCreated: req.body.dateCreated,
        isBooked: false,
        feedback: req.body.feedback,
        extraInfo: req.body.extraInfo
    })
    res.send("HELLO")
})

Interveiw_routes.put("/:id", async (req, res) => {
    await Interveiws.findByPk(req.params.id)
    .then(async campus => {
        if (campus != null) {
            await Interveiws.update({
                dateCreated: req.body.dateCreated,
                isBooked: false,
                feedback: req.body.feedback,
                extraInfo: req.body.extraInfo
            },
            {
                where: {
                    id: req.params.id
                }
            })
            
            console.log(`Entry ${req.params.id} has been updated`)
            await Interveiws.findAll()
            .then(data => res.status(200).json())
        }
        else {
            res.send("NO INTERVIEW OF THAT ID")
        }
    })
})

module.exports = Interveiw_routes