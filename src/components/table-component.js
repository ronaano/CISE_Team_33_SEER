import React, { Component } from 'react';

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
    </tr>
)

export default class Table extends Component {
    constructor(props) {
        super(props);
    }

    articlesList(submittedArticles){
        return submittedArticles.map(
            currentarticle => {
                return <Article article={currentarticle} key={currentarticle._id}/>;
            })
    }

    render(){
        return(
            <div>
                <table>
                    <thead className ="thead-light">
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
                    </thead>
                    <tbody>
                        {this.articlesList(this.props.submittedArticles)}
                    </tbody>
                </table>
            </div>
        )
    }
}