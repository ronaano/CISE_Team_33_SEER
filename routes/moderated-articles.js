const router = require('express').Router();
let Article = require('../models/Article.model');

router.route('/').get((req, res) => {
    Article.find()
        .then(articles => res.json(articles))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add/:articleId').post((req, res) => {
   // console.log("Request: " + JSON.stringify(req.body));
   
    const newModeratedArticle = Article.find({"_id":req.body._id});
   // console.log("New Article" + JSON.stringify(newModeratedArticle));
    newModeratedArticle.save()
        .then(() => res.json('Moderated article added!'))
        .catch(err => { console.log("Err value: "+ JSON.stringify(err)); res.status(400).json('Error: ' + err)});
});

module.exports = router;