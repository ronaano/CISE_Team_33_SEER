const router = require('express').Router();
let Article = require('../models/Article.model');

router.route('/').get((req, res) => {
    Article.find()
        .then(articles => res.json(articles))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    console.log("Request: " + JSON.stringify(req.body));
    const author = req.body.author;
    const title = req.body.title;
    const journal = req.body.journal;
    const year = req.body.year;
    const volume = req.body.volume;
    const number = req.body.number;
    const pages = req.body.pages;
    const month = req.body.month;
    const status = req.body.status;

    const newArticle = new Article({
        author,
        title,
        journal,
        year,
        volume,
        number,
        pages,
        month,
        status
    });
    console.log("New Article" + JSON.stringify(newArticle));
    newArticle.save()
        .then(() => res.json('Article added!'))
        .catch(err => { console.log("Err value: "+ JSON.stringify(err)); res.status(400).json('Error: ' + err)});
});

module.exports = router;