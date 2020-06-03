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
        axios.get("http://localhost:5000/moderated-articles")
            .then(res => {
                this.setState({ moderatedArticles: res.data })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        return (
            <Table type={false} submittedArticles={this.state.moderatedArticles} />
        )
    }
}