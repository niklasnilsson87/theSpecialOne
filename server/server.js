const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('./config/mongoose')
const helmet = require('helmet')
require('dotenv').config()

const app = express()

app.use(helmet())

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'"],
    scriptSrc: ["'self'"],
    formAction: ["'self'"]
  }
}))

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

const port = process.env.PORT

app.listen(port, () => console.log(`Server started on port ${port}`))
