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
        axios.get("/articles")
            .then(res => {
                this.setState({ submittedArticles: res.data })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    changeArticlesState = (articleID) => {
        let newSubmittedArticles = [...this.state.submittedArticles];
        newSubmittedArticles.filter(function (article) { return (article._id !== articleID) });
        this.setState(
            {
                submittedArticles: newSubmittedArticles
            });
    }

    render() {
        return (
            <Table type="mod" submittedArticles={this.state.submittedArticles}
                articleState={this.changeArticlesState} />
        )
    }
}
