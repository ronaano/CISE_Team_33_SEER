import React, { Component } from 'react';
import axios from 'axios';
import Table from './table-component.js';

export default class AnalystDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moderatedArticles: []
        };
    }

    componentDidMount() {
        axios.get("/moderatedarticles")
            .then(res => {
                this.setState({ moderatedArticles: res.data })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        return (
            <Table type="analyst"
                submittedArticles={this.state.moderatedArticles} />
        )
    }
}