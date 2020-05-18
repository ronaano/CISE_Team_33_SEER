const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const articleSchema = new Schema({
 author: {
     type:String,
     required: true,
     trim :true,   
 },
 title: {
    type:String,
    required: true,
    trim :true,
},
journal: {
    type:String,
    required: true,
    trim :true,
},
year: {
    type:Number,
    required: true,
    trim :true,
    maxlength: 4
},
volume: {
    type:String,
    required: true,
    unique: true,
    trim :true,
},
number: {
    type:String,
    required: true,
    unique: true,
    trim :true,
   
},
pages: {
    type:String,
    required: true,
    unique: true,
    trim :true,
},
month: {
    type:String,
    required: true,
    trim :true,
    maxlength: 3   
},
}, {
    timestamps:true,
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;