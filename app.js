const express = require('express')
const app = express()
const { config, engine } = require('express-edge')
const articles = require('./routes/articles')
const aboutPage = require('./routes/pages')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', err => {
    console.log(err)
})

db.once('open', () => {
    console.log('Server database connection established')
})

const Schema = mongoose.Schema
const details = new Schema({
    name: {
        type: String,
        requiered: true,
        minLength: 3,
    },
    designation: {
        title: String,
        required: true,
    },
})

const Details = mongoose.model('details', details)

app.get('/details', (req, res) => {
    const demoDetails = new Details({
        name: 'Enamul Haque',
        designation: 'Web Developer',
    })
    demoDetails
        .save()
        .then(data => {
            res.json({ data })
        })
        .catch(err => console.log(err))
})

// Show all collections
app.get('/show', (req, res) => {
    Details.find()
        .then(data => {
            res.json({ data })
        })
        .catch(err => console.log(err))
})

// Low DB
// const db = require('./utils/db')

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
