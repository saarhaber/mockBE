const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000

// routes
const api_router = require('./routes/api_routes')

app.get('/', (req, res) => {
    res.send("THIS IS THE HOMEPAGE")
})

app.get('/api', api_router)

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))