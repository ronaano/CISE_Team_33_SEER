const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
    useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true
});

const conn = mongoose.connection;

conn.once('open', () => {
    console.log("Connection to MongoDB established")
})

const articlesRouter = require("./routes/articles.js");
const moderatedArticlesRouter = require("./routes/moderated-articles.js");
const rejectedArticlesRouter = require("./routes/rejected-articles.js");
const evidenceRecordsRouter = require("./routes/evidencerecords.js");
app.use("/articles", articlesRouter);
app.use("/moderatedarticles", moderatedArticlesRouter);
app.use("/rejectedarticles", rejectedArticlesRouter);
app.use("/evidencerecords", evidenceRecordsRouter);

if (process.env.NODE_ENV === "production") {
    app.use(express.static('build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve('build', 'index.html'));
    });
}
app.listen(port, () => {
    console.log("Server is running!");
})
