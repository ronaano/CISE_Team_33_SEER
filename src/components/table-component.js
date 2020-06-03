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
        <td>{(true ? (<div><button onClick={props.acceptArticle} /><button onClick={props.rejectArticle} /></div>) : <button>Analyze</button>)}</td>
    </tr>
);

//nothing on first click, works on second click
//subsequent clicks on other articles dont overwrite the previous saved article(shouldnt matter as page should refresh anyway)

export default class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleSelected: []
        };
    }

    async acceptArticle(articleID) {
        await axios.get("http://localhost:5000/articles/" + articleID)
            .then(res => {
                this.setState({
                    articleSelected: res.data
                });
            });

        axios.post("http://localhost:5000/moderatedarticles/add/", this.state.articleSelected)
            .then(res => console.log(res.data));

        axios.delete("http://localhost:5000/articles/" + articleID)
            .then(res => console.log(res.data));

        this.props.articleState(articleID);

        window.location = "/mod";
    }

    async rejectArticle(articleID) {
        console.log("reject check");
        await axios.get("http://localhost:5000/articles/" + articleID)
            .then(res => {
                this.setState({
                    articleSelected: res.data
                });
            });

        axios.post("http://localhost:5000/rejectedarticles/add/", this.state.articleSelected)
            .then(res => console.log(res.data));

        axios.delete("http://localhost:5000/articles/" + articleID)
            .then(res => console.log(res.data));

        this.props.articleState(articleID);

        window.location = "/mod";
    }

    articlesList(submittedArticles) {
        console.log(submittedArticles);
        return submittedArticles.map(
            currentarticle => {
                return <Article rejectArticle={() => { this.rejectArticle(currentarticle._id) }} acceptArticle={() => { this.acceptArticle(currentarticle._id) }} typeofdisplay={true} article={currentarticle} key={currentarticle._id} />;
            })
    }



    // rejectArticle(articleID) {
    //     let articleSelected = {};

    //     axios.get("http://localhost:5000/articles/" + articleID)
    //         .then(res => { articleSelected = res.data });

    //     axios.post("http://localhost:5000/rejectedarticles/add/", articleSelected)
    //         .then(res => console.log(res.data));

    //     axios.delete("http://localhost:5000/articles/" + articleID)
    //         .then(res => console.log(res.data));

    //     this.setState({ submittedArticles: this.props.submittedArticles.filter(article => this.props.article._id !== articleID) })
    //     // window.location.reload(false);
    //     /*Delete the article and filter submitted articles so it doesn't show the article that has been deleted with that specific id*/
    // }

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
                            <th>{(this.props.type ? "Accept/Reject" : "Analyse")}</th>
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