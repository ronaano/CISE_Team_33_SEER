import React, { Component } from 'react';
import axios from 'axios';

export default class ModDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rejectedArticles: []
        };
    }

    componentDidMount() {
        axios.get("/rejectedarticles")
            .then(res => {
                this.setState({ rejectedArticles: res.data })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        return (
            <table>
                <tbody>
                    <tr>
                        <th>Author</th>
                        <th>Title</th>
                        <th>Journal</th>
                        <th>Year</th>
                        <th>Volume</th>
                        <th>Number</th>
                        <th>Pages</th>
                        <th>Month</th>
                    </tr>
                    {this.state.rejectedArticles.map((rejectedArticle) => {
                        return (<tr key={rejectedArticle._id}>
                            <td>{rejectedArticle.author}</td>
                            <td>{rejectedArticle.title}</td>
                            <td>{rejectedArticle.journal}</td>
                            <td>{rejectedArticle.year}</td>
                            <td>{rejectedArticle.volume}</td>
                            <td>{rejectedArticle.number}</td>
                            <td>{rejectedArticle.pages}</td>
                            <td>{rejectedArticle.month}</td>
                        </tr>)
                    })}
                </tbody>
            </table>
        )
    }
}