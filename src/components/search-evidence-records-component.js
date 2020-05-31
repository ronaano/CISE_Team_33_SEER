import React, { Component } from 'react';
import axios from 'axios';
import FilterGroup from './filtergroup-component';

const filterGroups = [{ id: 1, select1: "", select2: "", select3: "" }];

export default class SearchEvidenceRecords extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            select1value: '',
            select2value: '',
            select3value: '',
            filters: [
                { key: 1, value: "Software Engineering Method" },
                { key: 2, value: "Research Method" },
                { key: 3, value: "Methodology" },
                { key: 4, value: "Participants" }],
            operators: ["contains", "does not contain", "begins with", "ends with", "is equal to"],
            semethods: ["TDD", "BDD", "Pair Programming", "Planning Poker", "Daily Standup Meetings"],
            semethodology: ["Scrum", "Waterfall", "Spiral", "XP"],
            participants: ["Undergraduate Students", "Postgraduate Students", "Pracitioners"],
            remethod: ["Case Study", "Field Observation", "Experiment", "Interview", "Survey"],
            operators2: ["AND", "OR"],
            results: [],
            select3dropdown: []
        };
    }

    componentDidMount() {
        this.setState({
            select3dropdown: this.state.semethods
        })
    }

    onSubmit(event) {
        event.preventDefault();
        axios.get("http://localhost:5000/evidencerecords/search").
            then(response => {
                this.setState({
                    results: response.data
                });
            })
            .catch(err => console.log(err));
    }

    handleSelect1 = (event) => {
        let dropdown = [];
        let key = event.target.value;
        if (key === "Software Engineering Method") {
            dropdown = this.state.semethods;
        }
        else if (key === "Research Method") {
            dropdown = this.state.remethod;
        } else if (key === "Methodology") {
            dropdown = this.state.semethodology;
        } else if (key === "Participants") {
            dropdown = this.state.participants;
        }
        this.setState({
            select1value: event.target.value,
            select3dropdown: dropdown
        });


    }

    handleSelect2 = (event) => {
        this.setState({
            select2value: event.target.value
        });
    }

    handleSelect3 = (event) => {
        this.setState({
            select3value: event.target.value
        });
    }

    render() {


        return (
            <form onSubmit={this.onSubmit}>
                <div>
                    <select value={this.state.select1value} onChange={this.handleSelect1}>
                        {this.state.filters.map(options => {
                            return <option key={options.key} data-customkey={options.key} value={options.value}>{options.value}</option>
                        }
                        )}
                    </select>
                    <select value={this.state.select2value} onChange={this.handleSelect2} >
                        {this.state.operators.map(options => {
                            return <option key={options} value={options}>{options}</option>
                        }
                        )}
                    </select>
                    <select value={this.state.select3value} onChange={this.handleSelect3}>
                        {this.state.select3dropdown.map(options => {
                            return <option key={options} value={options}>{options}</option>;
                        })}
                    </select>
                </div>
                {/* <input value={this.state.search}>Description</input>
                {filterGroups.map((filterGroup) => {
              //  <FilterGroup key={filterGroup.id} select1={this.state.filters} select2={this.state.operators} select3={} />})
                } */}
                <button>+</button>
                <input type="submit" value="Search" onChange={this.onSubmit} />
            </form>
        );
    }
}