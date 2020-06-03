const router = require('express').Router();
let EvidenceRecord = require('../models/evidencerecord.model');

router.route('/').get((req, res) => {
    EvidenceRecord.find()
        .then(evidenceRecords => res.json(evidenceRecords))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/search').post((req, res) => {
    let filterGroups = req.body;
    let query = { $and: [], $or: [] };
    const queryObject = {};

    //console.log(filterGroups);
    for (let i = 0; i < filterGroups.length; i++) {
        let logic = filterGroups[i].logicoperator;
        let select1 = filterGroups[i].select1;
        let select2 = filterGroups[i].select2;
        let select3 = filterGroups[i].select3;
        if (i === (filterGroups.length - 1) && i > 1) {
            filterGroups[i].logicoperator = filterGroups[(filterGroups.length - 2)].logicoperator;
           // console.log(filterGroups[i].logicoperator);
        } switch (select2) {
            case 'is equal to': {
                queryObject[select1] = select3;
                break;
            }
            case 'contains': {
                queryObject[select1] = { $regex: "/" + select3 + "/" }
                break;
            }
            case 'does not contain': {
                queryObject[select1] = { $regex: "/^((?!" + select3 + ").)*$/" }
                break;
            }
            case 'begins with': {
                queryObject[select1] = { $regex: "/^" + select3 + "/" }
                break;
            }
            case 'ends with': {
                queryObject[select1] = { $regex: "/" + select3 + "$/" }
                break;
            }
            default: {
                break
            }
        }
        if (logic === "OR") {
            query.$or.push(
                queryObject
            );
        } else if (logic === "AND") {
            query.$and.push(
                queryObject
            );
        }
    }
    if (query.$and.length === 0 && query.$or.length === 0) {
        EvidenceRecord.find(queryObject)
            .then(results => res.json(results))
            .catch(err => console.log(err));
    } else if (query.$and.length === 0 && query.$or.length !== 0) {
        delete query.$and;
        EvidenceRecord.find(query)
            .then(results => res.json(results))
            .catch(err => console.log(err));
    } else if (query.$and.length !== 0 && query.$or.length === 0) {
        delete query.$or;
        EvidenceRecord.find(query)
            .then(results => res.json(results))
            .catch(err => console.log(err));
    } else {
        EvidenceRecord.find(query)
            .then(results => res.json(results))
            .catch(err => console.log(err));
    }
});

module.exports = router;
