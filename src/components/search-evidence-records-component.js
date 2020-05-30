import React, { Component } from 'react';
import axios from 'axios';
import FilterGroup from './filtergroup-component';

const filterGroups = [{ id: 1 , select1 : "", select2: "", select3: ""}];

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
            operators: ["contains", "does not contain", "begins with", "ends with", "is equal to"],
            operators2: ["AND", "OR"],
            results: []
        };
    }
    
    componentDidMount(){

    }

    onSubmit(event) {
        event.preventDefault();
        axios.get("http://localhost:5000/evidencerecord/search").
        then(response => {
            this.setState({
            results: response.data});
        })
        .catch(err => console.log(err + http_response_code(400)));
    }

    addFilter(){
       // filterGroups.push({this.prevState.id+1, select1 : "", select2: "", select3: ""});
    }

    removeFilter(){
        filterGroups.pop();
    }


    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input value={this.state.search}>Description</input>
                {filterGroups.map((filterGroup) => {
                <FilterGroup key={filterGroup.id} select1={this.state.filters} select2={this.state.operators} select3={} />})}
                <button onClick={addFilter}>+</button>
                <input type="submit" value="Search" onChange={this.onSubmit}/>
            </form>
        );
    }
}