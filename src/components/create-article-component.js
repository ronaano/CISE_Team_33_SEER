import React, { Component } from 'react';
import axios from 'axios';

export default class CreateArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            author: "",
            title: "",
            journal: "",
            year: "",
            volume: "",
            number: "",
            pages: "",
            month: ""
        };
        this.articleOnChange = this.articleOnChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    articleOnChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    async onSubmit(event) {
        event.preventDefault();
        const article = {
            author: this.state.author,
            title: this.state.title,
            journal: this.state.journal,
            year: this.state.year,
            volume: this.state.volume,
            number: this.state.number,
            pages: this.state.pages,
            month: this.state.month,
            status: "To be Moderated"
        }
        await axios.post('/articles/add', article)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));

        window.location = "/mod"
    }
    //Formgroup needs to know what state value it's changing! Passing the name and onChange function is easy.
    // store a key?? for each one maybe, maybe dependent on the key we set it????
    // the name of the field determines which state value we passing???
    // 
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>
                        Author:
              <input name="author" value={this.state.author}
                            onChange={this.articleOnChange} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Title:
              <input name="title" value={this.state.title}
                            onChange={this.articleOnChange} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Journal:
              <input name="journal" value={this.state.journal}
                            onChange={this.articleOnChange} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Year:
              <input name="year" value={this.state.year}
                            onChange={this.articleOnChange} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Number:
              <input name="number" value={this.state.number}
                            onChange={this.articleOnChange} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Volume:
              <input name="volume" value={this.state.volume}
                            onChange={this.articleOnChange} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Pages:
              <input name="pages" value={this.state.pages}
                            onChange={this.articleOnChange} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Month:
              <input name="month" value={this.state.month}
                            onChange={this.articleOnChange} />
                    </label>
                </div>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
