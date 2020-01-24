const express = require('express')
const app = express()
const { config, engine } = require('express-edge')
const axios = require('axios')

config({ cache: process.env.NODE_ENV === 'production' })
app.use(engine)
app.set('views', `${__dirname}/views`)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// static file
app.use(express.static('public'))

app.get('/', async (req, res) => {
    let { data: posts } = await axios.get('https://jsonplaceholder.typicode.com/posts')
    res.render('index', { posts })
})

const port = process.env.port || 3000
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})
