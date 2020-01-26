const express = require('express')
const app = express()
const { config, engine } = require('express-edge')
const articles = require('./routes/articles')
const aboutPage = require('./routes/pages')

// Low DB
const db = require('./utils/db')

config({ cache: process.env.NODE_ENV === 'production' })
app.use(engine)
app.set('views', `${__dirname}/views`)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// static file
app.use(express.static('public'))

// Artcles
app.use(articles)

// pages
app.use(aboutPage)

const port = process.env.port || 3000
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})
