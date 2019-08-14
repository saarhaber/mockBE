const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const api_routes = require('./routes/api_routes')

app.get('/', (req, res) => {
    res.send("THIS IS THE HOMEPAGE")
})

app.use('/api', api_routes)

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))