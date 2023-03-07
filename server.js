const express = require('express')
const path = require ('path')
const api = require('./routes/notes')

const app = express()
const PORT = process.env.PORT || 3001

// Custom middleware?

// Middleware for parsing JSON and urlencoded form data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', api)
app.use(express.static('./public'))

// GET Route for home page
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
)

// GET Route for Notes page
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
)

// wildcare route to direct users to a 404 page 
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/404.html'))
)

// listening for the port
app.listen(PORT, () =>
    console.log(`Listening at http://localhost:${PORT}`)
)