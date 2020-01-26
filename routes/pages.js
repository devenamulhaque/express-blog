const Router = require('express').Router()
const { aboutPage, contactPage, servicePage } = require('../controllers/pageController')

Router.get('/about', aboutPage)
Router.get('/contact', contactPage)
Router.get('/service', servicePage)

module.exports = Router
