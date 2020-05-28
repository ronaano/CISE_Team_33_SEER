import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
        <td><button onClick={acceptPaper(props.articles._id)} to={"/add/" + props.articles._id}>Accept</button></td>
    </tr>
}



export default class ModDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submittedArticles: []
        };
    };

    acceptPaper(articleID){
        axios.post("http://localhost:5000/moderatedarticles/add/" + articleID)
        .then( ) /*pass in the id of the article selected*/
        /*Change the status of the article to accepted */
        axios.delete("http://localhost:5000/articles/"+articleID)
        /*Delete the article and filter submitted articles so it doesn't show the article that has been deleted with that specific id*/
    }

    /* Reject paper method, button which activates this method. A route representing rejected papers, which only has add and a home route 
    displaying all the rejected articles.*/
    /*Change the status of the article to rejected */
    /*Delete the article and filter submitted articles so it doesn't show the article that has been deleted with that specific id*/

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
                            <th>Accept/Reject</th>
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