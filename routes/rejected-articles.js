const router = require('express').Router();
let Article = require('../models/Article.model');

router.route('/').get((req, res) => {
    Article.find()
        .then(rejectedarticles => res.json(rejectedarticles))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add/:articleId').post((req, res) => {   
    const newRejectedArticle = Article.find({"_id":req.body._id});
    newRejectedArticle.save()
        .then(() => res.json('Rejected article added!'))
        .catch(err => { console.log("Err value: "+ JSON.stringify(err)); res.status(400).json('Error: ' + err)});
});

module.exports = router;