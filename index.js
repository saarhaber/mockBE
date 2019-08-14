const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send("THIS IS THE HOMEPAGE")
})

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))