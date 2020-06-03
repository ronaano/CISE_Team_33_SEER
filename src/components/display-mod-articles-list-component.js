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
