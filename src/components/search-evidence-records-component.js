import React, { Component } from 'react';
import axios from 'axios';

export default class SearchEvidenceRecords extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            filters: ["Method", "Benefit", "Research Method", "Methodology", "Participants","Benefit", "Context of Research", "Result"],
            semethods:["TDD","BDD", "Pair Programming", "Planning Poker", "Daily Standup Meetings"],
            semethodology: ["Scrum", "Waterfall", "Spiral", "XP"],
            participants: ["Undergraduate Students", "Postgraduate Students", "Pracitioners"],
            remethod: ["Case Study", "Field Observation", "Experiment", "Interview", "Survey"],
            benefit: [],
            context: [],
            result: "",
            operators: ["contains", "does not contain", "begins with", "ends with", "is equal to"],
            operators2: ["AND", "OR"]
        };
    }

    onSubmit(event) {
        event.preventDefault();
    }

    addFilter(){
        
    }

    removeFilter(){

    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input value={this.state.search}></input>
                <button onClick={removeFilter}>-</button>
                <button onClick={addFilter}>+</button>
                <input type="submit" value="Search"/>
            </form>
        );
    }
}