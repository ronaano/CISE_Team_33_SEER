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
        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeJournal = this.onChangeJournal.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.onChangeVolume = this.onChangeVolume.bind(this);
        this.onChangeNumber = this.onChangeNumber.bind(this);
        this.onChangePages = this.onChangePages.bind(this);
        this.onChangeMonth = this.onChangeMonth.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeAuthor(event) {
        this.setState({
            author: event.target.value
        });
    }

    onChangeTitle(event) {
        this.setState({ title: event.target.value });
    }

    onChangeJournal(event) {
        this.setState({ journal: event.target.value });
    }

    onChangeYear(event) {
        this.setState({ year: event.target.value });
    }

    onChangeVolume(event) {
        this.setState({ volume: event.target.value });
    }

    onChangeNumber(event) {
        this.setState({ number: event.target.value });
    }

    onChangePages(event) {
        this.setState({ pages: event.target.value });
    }

    onChangeMonth(event) {
        this.setState({ month: event.target.value });
    }

    onSubmit(event) {
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
        console.log("Ronan" + JSON.stringify(article));
        axios.post('http://localhost:5000/articles/add', article)
        .then(res => console.log(res.data));
        
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>
                        Author:
              <input value={this.state.author} onChange={this.onChangeAuthor} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Title:
              <input value={this.state.title} onChange={this.onChangeTitle} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Journal:
              <input value={this.state.journal} onChange={this.onChangeJournal} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Year:
              <input value={this.state.year} onChange={this.onChangeYear} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Number:
              <input value={this.state.number} onChange={this.onChangeNumber} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Volume:
              <input value={this.state.volume} onChange={this.onChangeVolume} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Pages:
              <input value={this.state.pages} onChange={this.onChangePages} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Month:
              <input value={this.state.month} onChange={this.onChangeMonth} />
                    </label>
                </div>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}