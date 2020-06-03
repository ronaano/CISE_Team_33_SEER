const router = require('express').Router();
let RejectedArticle = require('../models/rejectedarticle.model');

router.route('/').get((req, res) => {
    RejectedArticle.find()
        .then(rejectedarticles => res.json(rejectedarticles))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const _id = req.body._id;
    const author = req.body.author;
    const title = req.body.title;
    const journal = req.body.journal;
    const year = req.body.year;
    const volume = req.body.volume;
    const number = req.body.number;
    const pages = req.body.pages;
    const month = req.body.month;
    let status = req.body.status;

    status = "rejected";

    const newRejectedArticle = new RejectedArticle({
        _id,
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

    newRejectedArticle.save()
        .then(() => res.json('Rejected article added!'))
        .catch(err => { console.log("Err value: " + JSON.stringify(err)); res.status(400).json('Error: ' + err) });
});

module.exports = router;