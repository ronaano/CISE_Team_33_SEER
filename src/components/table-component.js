import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Article = props => (
    <tr>
        <td>{props.article.author}</td>
        <td>{props.article.title}</td>
        <td>{props.article.journal}</td>
        <td>{props.article.year}</td>
        <td>{props.article.volume}</td>
        <td>{props.article.number}</td>
        <td>{props.article.pages}</td>
        <td>{props.article.month}</td>
        <td>{(false ? (<div>
            <button
                onClick={props.acceptArticle}>Accept</button>
            <button
                onClick={props.rejectArticle}>Reject</button>
        </div>) :
            (<Link to={"/createevidencerecord/" + props.article._id}>Analyze
            </Link>))}</td>
    </tr>
);

export default class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleSelected: []
        };
    }

    async acceptArticle(articleID) {
        await axios.get("/articles/" + articleID)
            .then(res => {
                this.setState({
                    articleSelected: res.data
                });
            });

        axios.post("/moderatedarticles/add/",
            this.state.articleSelected)
            .then(res => console.log(res.data));

        axios.delete("/articles/" + articleID)
            .then(res => console.log(res.data));

        this.props.articleState(articleID);

        window.location = "/mod";
    }

    async rejectArticle(articleID) {
        await axios.get("/articles/" + articleID)
            .then(res => {
                this.setState({
                    articleSelected: res.data
                });
            });

        axios.post("/rejectedarticles/add/",
            this.state.articleSelected)
            .then(res => console.log(res.data));

        axios.delete("/articles/" + articleID)
            .then(res => console.log(res.data));

        this.props.articleState(articleID);

        window.location = "/mod";
    }

    articlesList(submittedArticles) {
        console.log(submittedArticles);
        return submittedArticles.map(
            currentarticle => {
                return <Article type={this.props.type}
                    rejectArticle={() => {
                        this.rejectArticle(currentarticle._id)
                    }}
                    acceptArticle={() => {
                        this.acceptArticle(currentarticle._id)
                    }}
                    typeofdisplay={true}
                    article={currentarticle}
                    key={currentarticle._id}
                    _id={currentarticle._id} />;
            })
    }

    render() {
        return (
            <div>
                <table>
                    <thead className="thead-light">
                        <tr>
                            <th>Author</th>
                            <th>Title</th>
                            <th>Journal</th>
                            <th>Year</th>
                            <th>Volume</th>
                            <th>Number</th>
                            <th>Pages</th>
                            <th>Month</th>
                            <th>{(this.props.type ? "Accept/Reject" :
                                "Analyse")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.articlesList(this.props.submittedArticles)}
                    </tbody>
                </table>
            </div>
        )
    }
}
