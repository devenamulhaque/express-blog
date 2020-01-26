const axios = require('axios')
const db = require('../utils/db')
const uuid = require('uuid')

const articles = async (req, res) => {
    let articleList = db.get('posts')
    res.render('index', { articleList })
}

const createArticle = (req, res) => {
    res.render('articles.create')
}

const postArticle = (req, res) => {
    db.get('posts')
        .push({
            id: uuid.v4(),
            title: req.body.title,
            category: req.body.category,
            body: req.body.body,
        })
        .write()
    res.redirect('/')
}

const singleArticle = (req, res) => {
    const singlePost = db.get('posts').find({ id: req.params.id })
    res.render('articles.single', { post: singlePost.toJSON() })
}

const editArticle = (req, res) => {
    const article = db.get('posts').find({ id: req.params.id })
    res.render('articles.edit', { post: article.toJSON() })
}

module.exports = { articles, createArticle, postArticle, singleArticle, editArticle }
