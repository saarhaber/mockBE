const post_routes = require('express').Router()

post_routes.get('/', (req, res) => {
    res.send("POSTS HERE")
})

module.exports = post_routes