const express = require('express')
const db = require('./database')
const app = express()
const PORT = process.env.PORT || 5000
const api_routes = require('./routes/api_routes')
const seedDatabase = require('./seed_data')
const bodyParser = require('body-parser')

db.sync({force: true}).then(async () => {
    seedDatabase()

    app.use(bodyParser.json())

    app.get('/', (req, res) => {
        res.send("THIS IS THE HOMEPAGE")
    })
    
    app.use('/api', api_routes)
    
    app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))
})