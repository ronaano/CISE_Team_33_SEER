import React, { Component } from 'react';
import axios from 'axios';
import FilterGroup from './filtergroup-component';


export default class SearchEvidenceRecords extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterGroups: [{ id: 0, select1: "", select2: "", select3: "", select3dropdown: [] }],
            counter: 0,
            search: "",
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
            results: []
        };
    }

    componentDidMount() {
        this.setState({
            select3dropdown: this.state.semethods
        })
    }

    onSubmit(event) {
        event.preventDefault();
        // axios.get("http://localhost:5000/evidencerecords/search").
        //     then(response => {
        //         this.setState({
        //             results: response.data
        //         });
        //     })
        //     .catch(err => console.log(err));
    }

    handleSelect1 = (event, id) => {
        let key = event.target.value;
        let filterGroupsModified = [...this.state.filterGroups];
        filterGroupsModified[id].select1 = key;
        if (key === "Software Engineering Method") {
            filterGroupsModified[id].select3dropdown = this.state.semethods;
        }
        else if (key === "Research Method") {
            filterGroupsModified[id].select3dropdown = this.state.remethod;
        } else if (key === "Methodology") {
            filterGroupsModified[id].select3dropdown = this.state.semethodology;
        } else if (key === "Participants") {
            filterGroupsModified[id].select3dropdown = this.state.participants;
        }
        this.setState({
            filterGroups: filterGroupsModified,
        });
        console.log(this.state.filterGroups);
    }

    handleSelect2 = (event, id) => {
        let key = event.target.value;
        let filterGroupsModified = [...this.state.filterGroups];
        filterGroupsModified[id].select2 = key;
        this.setState({
            filterGroups: filterGroupsModified
        });
    }

    handleSelect3 = (event, id) => {
        let key = event.target.value;
        let filterGroupsModified = [...this.state.filterGroups];
        filterGroupsModified[id].select3 = key;
        this.setState({
            filterGroups: filterGroupsModified
        });
    }

    addFilter = () => {
        let newCounter = this.state.counter;
        newCounter++;
        let filterGroupsModified = [...this.state.filterGroups, { id: (newCounter), select1: "", select2: "", select3: "", select3dropdown: [] }];
        this.setState({
            counter: newCounter,
            filterGroups: filterGroupsModified
        });
        console.log(this.state.counter);
    }

    render() {


        return (
            <form onSubmit={this.onSubmit}>
                {/* <input value={this.state.search}>Description</input> */}
                {this.state.filterGroups.map((filterGroup) => {
                    return (<FilterGroup
                        key={filterGroup.id}
                        id={filterGroup.id}
                        select1={this.state.filters}
                        select2={this.state.operators}
                        select3={filterGroup.select3dropdown}
                        select1Change={this.handleSelect1}
                        select2Change={this.handleSelect2}
                        select3Change={this.handleSelect3}
                        selected1={this.state.select1value}
                        selected2={this.state.select2value}
                        selected3={this.state.select3value} />);
                }
                )}
                <button onClick={this.addFilter}>+</button>
                <input type="submit" value="Search" onChange={this.onSubmit} />
            </form>
        );
    }
}