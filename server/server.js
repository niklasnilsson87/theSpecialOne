const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('./config/mongoose')
require('dotenv').config()

const app = express()

app.use(bodyParser.json())

// connect to the database
mongoose.connect().catch(error => {
  console.error(error)
  process.exit(1)
})

app.use('/api/players', require('./routes/api/players'))

const port = process.env.PORT

app.listen(port, () => console.log(`Server started on port ${port}`))
