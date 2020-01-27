const Router = require('express').Router()
const { articles, createArticle, postArticle, singleArticle, editArticle } = require('../controllers/articleController')

// Article page
Router.get('/', articles)

// New article page
Router.get('/articles/create', createArticle)

// Show single article page
Router.get('/articles/:id', singleArticle)

// Edit article
Router.get('/edit/:id', editArticle)

// New article post request
Router.post('/', postArticle)

module.exports = Router
