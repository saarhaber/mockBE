const express = require('express')
const db = require('./database')
const app = express()
const PORT = process.env.PORT || 5000
const api_routes = require('./routes/api_routes')
const seedDatabase = require('./utils/seed_data')
const bodyParser = require('body-parser')
const cors = require('cors')

db.sync({force: true}).then(() => {
    seedDatabase()

    app.use(bodyParser.json())
    app.use(cors())

    app.get('/', (req, res) => {
        res.send("THIS IS THE HOMEPAGE")
    })
    
    app.use('/api', api_routes)

    app.use((err, req, res, next) => {
      console.error(err);
      console.error(err.stack);
      res.status(err.status || 500).send(err.message || "Internal server error");
    })
    
    app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))
})
