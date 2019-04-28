const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('./config/mongoose')
require('dotenv').config()

const app = express()

// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// connect to the database
mongoose.connect().catch(error => {
  console.error(error)
  process.exit(1)
})

app.use('/api/players', require('./routes/api/players'))
app.use('/api/signup', require('./routes/api/signup'))
app.use('/api/login', require('./routes/api/login'))
app.use('/api/edit', require('./routes/api/edit'))
app.use('/api/comment', require('./routes/api/comment'))
app.use('/api/getComment', require('./routes/api/getComment'))

const port = process.env.PORT

app.listen(port, () => console.log(`Server started on port ${port}`))
