import React, { Component } from 'react';
import axios from 'axios';
import FilterGroup from './filtergroup-component';


export default class SearchEvidenceRecords extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterGroups: [{ id: 0, select1: "SoftwareEngineeringMethod", select2: "contains", select3: "TDD", logicoperator: "", logicoperatordropdown: [], select3dropdown: [] }],
            counter: 0,
            search: "",
            filters: [
                { key: 1, name: "Software Engineering Method", value: "SoftwareEngineeringMethod" },
                { key: 2, name: "Research Method", value: "ResearchMethod" },
                { key: 3, name: "Software Engineering Methodology", value: "SoftwareEngineeringMethodology" },
                { key: 4, name: "Participants", value: "Participants" }],
            operators: ["contains", "does not contain", "begins with", "ends with", "is equal to"],
            remethod: ["Case Study", "Field Observation", "Experiment", "Interview", "Survey"],
            participants: ["Undergraduate Students", "Postgraduate Students", "Pracitioners"],
            semethods: ["TDD", "BDD", "Pair Programming", "Planning Poker",
                "Daily Standup Meetings", "Story Boards", "User Story Mapping",
                "Continuous Integration", "Retrospectives", "Burn-down Charts",
                "Requirements Prioritisation", "Version Control",
                "Code Sharing"],
            semethodology: ["Scrum", "Waterfall", "Spiral", "XP",
                "Rational Unified Process", "Crystal", "Clean room",
                "Feature Driven Development", "Model Driven Development",
                "Domain Driven Development", "Formal methods",
                "Problem Driven Development", "Cloud computing",
                "Service Oriented Development", "Aspect Oriented Development",
                "Values Driven Development", "Product Driven Development", "Agile"],
            logicoperators: ["AND", "OR"],
            results: []
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        let filterGroupsModified = [...this.state.filterGroups];
        filterGroupsModified[this.state.counter].select3dropdown = this.state.semethods;
        this.setState({
            filterGroups: filterGroupsModified
        })
    }

    handleSelect1 = (event, id) => {
        let select1Value = event.target.value;
        let filterGroupsModified = [...this.state.filterGroups];
        filterGroupsModified[id].select1 = select1Value;
        if (select1Value === "SoftwareEngineeringMethod") {
            filterGroupsModified[id].select3dropdown = this.state.semethods;
        } else if (select1Value === "ResearchMethod") {
            filterGroupsModified[id].select3dropdown = this.state.remethod;
        } else if (select1Value === "SoftwareEngineeringMethodology") {
            filterGroupsModified[id].select3dropdown = this.state.semethodology;
        } else if (select1Value === "Participants") {
            filterGroupsModified[id].select3dropdown = this.state.participants;
        }
        this.setState({
            filterGroups: filterGroupsModified
        });
    }

    handleSelect2 = (event, id) => {
        let select2value = event.target.value;
        let filterGroupsModified = [...this.state.filterGroups];
        filterGroupsModified[id].select2 = select2value;
        this.setState({
            filterGroups: filterGroupsModified
        });
    }

    handleSelect3 = (event, id) => {
        let select3value = event.target.value;
        let filterGroupsModified = [...this.state.filterGroups];
        filterGroupsModified[id].select3 = select3value;
        this.setState({
            filterGroups: filterGroupsModified
        });
    }

    handleLogicOperator = (event, id) => {
        let logicValue = event.target.value;
        let filterGroupsModified = [...this.state.filterGroups];
        filterGroupsModified[id].logicoperator = logicValue;
        this.setState({
            filterGroups: filterGroupsModified
        });
    }

    addFilter = () => {
        let newFilterGroupID = this.state.counter;
        newFilterGroupID++;
        let filterGroupsModified = [...this.state.filterGroups, {
            id: (newFilterGroupID), select1: "SoftwareEngineeringMethod",
            select2: "contains", select3: "TDD", select3dropdown: [],
            logicoperator: "", logicoperatordropdown: []
        }];
        filterGroupsModified[this.state.counter].logicoperatordropdown
            = this.state.logicoperators;
        filterGroupsModified[this.state.counter].logicoperator
            = "AND";
        filterGroupsModified[newFilterGroupID].select3dropdown
            = this.state.semethods;
        this.setState({
            counter: newFilterGroupID,
            filterGroups: filterGroupsModified
        });
    }

    removeFilter = () => {
        if (this.state.counter !== 0) {
            let currentlastFilterGroupID = this.state.counter;
            let lastFilterGroupID = this.state.counter;
            let filterGroupsModified = [...this.state.filterGroups];
            lastFilterGroupID--;
            filterGroupsModified[lastFilterGroupID].logicoperatordropdown = [];
            filterGroupsModified[lastFilterGroupID].logicoperator = "";
            filterGroupsModified.splice(currentlastFilterGroupID, 1);
            this.setState({
                counter: lastFilterGroupID,
                filterGroups: filterGroupsModified
            });
        }
    }


    onSubmit(event) {
        event.preventDefault();
        axios.post("http://localhost:5000/evidencerecords/search",
            this.state.filterGroups).then((response) => {
                console.log(JSON.stringify(response.data));
                this.setState({
                    results: response.data
                });
            }).catch(err => console.log(err));
    }


    render() {
        return (
            <form onSubmit={this.onSubmit}>
                {this.state.filterGroups.map((filterGroup) => {
                    return (<FilterGroup
                        key={filterGroup.id}
                        id={filterGroup.id}
                        select1={this.state.filters}
                        select2={this.state.operators}
                        select3={filterGroup.select3dropdown}
                        logic={filterGroup.logicoperatordropdown}
                        select1Change={this.handleSelect1}
                        select2Change={this.handleSelect2}
                        select3Change={this.handleSelect3}
                        logicChange={this.handleLogicOperator}
                        selected1={filterGroup.select1value}
                        selected2={filterGroup.select2value}
                        selected3={filterGroup.select3value}
                        selectedLogic={filterGroup.logicoperator}
                    />);
                }
                )}
                <button type="button" onClick={this.addFilter}>+</button>
                <br />
                <button type="button" onClick={this.removeFilter}>-</button>
                <br />
                <input type="submit" value="Search" onChange={this.onSubmit} />
                <br />
                <table>
                    <tbody>
                        <tr>
                            <th>Author</th>
                            <th>Title</th>
                            <th>Month</th>
                            <th>Year</th>
                            <th>Description</th>
                            <th>Outcome</th>
                            <th>Context</th>
                            <th>Result</th>
                            <th>Research Method</th>
                            <th>Software Engineering Method</th>
                            <th>Software Engineering Methodology</th>
                        </tr>
                        {this.state.results.map((evidenceRecord) => {
                            return (<tr key={evidenceRecord
                                ._id}>
                                <td>{evidenceRecord
                                    .Author}</td>
                                <td>{evidenceRecord
                                    .Title}</td>
                                <td>{evidenceRecord
                                    .Month}</td>
                                <td>{evidenceRecord
                                    .Year}</td>
                                <td>{evidenceRecord
                                    .Description}</td>
                                <td>{evidenceRecord
                                    .Outcome}</td>
                                <td>{evidenceRecord
                                    .Context}</td>
                                <td>{evidenceRecord
                                    .Result}</td>
                                <td>{evidenceRecord
                                    .ResearchMethod}</td>
                                <td>{evidenceRecord
                                    .SoftwareEngineeringMethod}</td>
                                <td>{evidenceRecord
                                    .SoftwareEngineeringMethodology}</td>
                            </tr>)
                        })}
                    </tbody>
                </table>
            </form>
        );
    }
}