import React, { Component } from 'react';
import axios from 'axios';


const Article = props => {
    <tr>
        <td>{props.articles.author}</td>
        <td>{props.articles.title}</td>
        <td>{props.articles.journal}</td>
        <td>{props.articles.year}</td>
        <td>{props.articles.volume}</td>
        <td>{props.articles.number}</td>
        <td>{props.articles.pages}</td>
        <td>{props.articles.month}</td>
    </tr>
}

export default class ModDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submittedArticles: []
        };
    };

    componentDidMount(){
        axios.get("http://localhost:5000/articles")
            .then(res => {
                this.setState({submittedArticles: res.data })
            })
            .catch((err) => { 
                console.log(err) 
            })
    }

    articlesList(){
        return this.state.submittedArticles.map(
            currentarticle => {
                return <Article articles={currentarticle} key={currentarticle._id}/>
            }
            )
    }

    render(){
        return(
            <div>
                <table>
                    <thead>
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
                        {this.articlesList()}
                    </tbody>
                </table>
            </div>
        );
 
    }
}