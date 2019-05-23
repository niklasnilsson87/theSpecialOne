const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('./config/mongoose')
require('dotenv').config()
const path = require('path')

const app = express()

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

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('../client/build'))

  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`))
