import React, { Component } from 'react';
import axios from 'axios';
import Table from './table-component.js';

export default class ModDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submittedArticles: []
        };

        this.changeArticlesState = this.changeArticlesState.bind(this);
    }

    // acceptPaper(articleID){
    //     this.props.article.status = "Accepted"
    //     axios.post("http://localhost:5000/articles/add/" + articleID)
    //     .then( ) /*pass in the id of the article selected*/
    //     /*Change the status of the article to accepted */
    //     axios.delete("http://localhost:5000/articles/" + articleID)
    //     window.location.reload(false);
    //     /*Delete the article and filter submitted articles so it doesn't show the article that has been deleted with that specific id*/
    // }

    // rejectPaper(ArticleID){
    //     axios.post("http://localhost:5000/rejectedarticles/add/" + articleID)

    //     axios.delete("http://localhost:5000/articles/" + articleID)
    //     window.location.reload(false);
    // }



    /* Reject paper method, button which activates this method. A route representing rejected papers, which only has add and a home route 
    displaying all the rejected articles.*/
    /*Change the status of the article to rejected */
    /*Delete the article and filter submitted articles so it doesn't show the article that has been deleted with that specific id*/

    componentDidMount() {
        axios.get("http://localhost:5000/articles")
            .then(res => {
                this.setState({ submittedArticles: res.data })
            })
            .catch((err) => {
                console.log(err);
            })
        //console.log(this.state.submittedArticles);
    }

    changeArticlesState = (articleID) => {
        let newSubmittedArticles = [...this.state.submittedArticles];

        newSubmittedArticles.filter(function (article) { return (article._id !== articleID) });
        console.log("Before setting state:" + newSubmittedArticles);
        this.setState(
            {
                submittedArticles: newSubmittedArticles
            });


    }

    render() {
        return (
            <Table type={true} submittedArticles={this.state.submittedArticles} articleState={this.changeArticlesState} />
        )
    }
}