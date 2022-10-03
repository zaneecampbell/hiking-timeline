const path = require('path')
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
// const PORT = process.env.PORT || 5000

// Connect to database
connectDB()

const app = express()

// Allows express to parse json data
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/timeline', require('./routes/timelineRoutes'))

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(
    express.static(
      path.join(__dirname, '../frontend/build', { dotfiles: 'allow' })
    )
  )

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  )
} else {
  app.get('/', (req, res) => res.send('Please set to production'))
}

app.use(errorHandler)

app.listen(process.env.PORT || 5000, () => console.log(`Server started`))
