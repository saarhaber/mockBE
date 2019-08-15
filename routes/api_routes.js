const api_routes = require('express').Router()
const user_routes = require('./user_routes')
const interview_routes = require('./interview_routes')

api_routes.get('/', (req, res) => {
    res.send("API HOMEPAGE")
})

api_routes.use('/users', user_routes)
api_routes.use('/interviews', interview_routes)

module.exports = api_routes