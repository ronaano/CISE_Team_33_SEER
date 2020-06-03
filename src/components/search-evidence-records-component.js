import React, { Component } from 'react';
import axios from 'axios';
import FilterGroup from './filtergroup-component';


export default class SearchEvidenceRecords extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterGroups: [{ id: 0, select1: "", select2: "", select3: "", logicoperator: "", logicoperatordropdown: [], select3dropdown: [] }],
            counter: 0,
            search: "",
            filters: [
                { key: 1, name: "Software Engineering Method", value: "SoftwareEngineeringMethod" },
                { key: 2, name: "Research Method", value: "ResearchMethod" },
                { key: 3, name: "Software Engineering Methodology", value: "SoftwareEngineeringMethodology" },
                { key: 4, name: "Participants", value: "Participants" }],
            operators: ["contains", "does not contain", "begins with", "ends with", "is equal to"],
            semethods: ["TDD", "BDD", "Pair Programming", "Planning Poker", "Daily Standup Meetings"],
            remethod: ["Case Study", "Field Observation", "Experiment", "Interview", "Survey"],
            semethodology: ["Scrum", "Waterfall", "Spiral", "XP"],
            participants: ["Undergraduate Students", "Postgraduate Students", "Pracitioners"],
            logicoperators: ["AND", "OR"],
            results: []
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({
            select3dropdown: this.state.semethods
        })
    }


    handleSelect1 = (event, id) => {
        let key = event.target.value;
        let filterGroupsModified = [...this.state.filterGroups];
        filterGroupsModified[id].select1 = key;
        if (key === "SoftwareEngineeringMethod") {
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

    handleLogicOperator = (event, id) => {
        let key = event.target.value;
        let filterGroupsModified = [...this.state.filterGroups];
        filterGroupsModified[id].logicoperator = key;
        this.setState({
            filterGroups: filterGroupsModified
        });
    }

    addFilter = () => {
        let newFilterGroupID = this.state.counter;
        newFilterGroupID++;
        // console.log("Before adding " + JSON.stringify(this.state.filterGroups));
        // console.log("Before adding new ID is" + newFilterGroupID);
        let filterGroupsModified = [...this.state.filterGroups, { id: (newFilterGroupID), select1: "", select2: "", select3: "", select3dropdown: [], logicoperator: "", logicoperatordropdown: [] }];
        filterGroupsModified[this.state.counter].logicoperatordropdown = this.state.logicoperators;
        filterGroupsModified[newFilterGroupID].select3dropdown = this.state.semethods;
        this.setState({
            counter: newFilterGroupID,
            filterGroups: filterGroupsModified
        });
    }

    removeFilter = () => {
        console.log("Before removing " + JSON.stringify(this.state.filterGroups));
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
        // console.log("After removing the counter is" + this.state.counter);
        // console.log("After removing " + JSON.stringify(this.state.filterGroups));
    }


    onSubmit(event) {
        event.preventDefault();
        axios.post("http://localhost:5000/evidencerecords/search", this.state.filterGroups).then((response) => {
            console.log(JSON.stringify(response.data));
            this.setState({
                results: response.data
            });
        }).catch(err => console.log(err));
        console.log(JSON.stringify(this.state.results));
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
                <button onClick={this.addFilter}>+</button>
                <br />
                <button onClick={this.removeFilter}>-</button>
                <br />
                <input type="submit" value="Search" onChange={this.onSubmit} />
                <br />
                <table>
                    <tbody>
                        <tr>
                            <th>Author</th>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Outcome</th>
                            <th>Context</th>
                            <th>Result</th>
                            <th>Research Method</th>
                            <th>Software Engineering Method</th>
                            <th>Software Engineering Methodology</th>
                        </tr>
                        {this.state.results.map((evidenceRecord) => {
                            return (<tr key={evidenceRecord._id}>
                                <td>{evidenceRecord.Author}</td>
                                <td>{evidenceRecord.Title}</td>
                                <td>{evidenceRecord.Date}</td>
                                <td>{evidenceRecord.Description}</td>
                                <td>{evidenceRecord.Outcome}</td>
                                <td>{evidenceRecord.Context}</td>
                                <td>{evidenceRecord.Result}</td>
                                <td>{evidenceRecord.ResearchMethod}</td>
                                <td>{evidenceRecord.SoftwareEngineeringMethod}</td>
                                <td>{evidenceRecord.SoftwareEngineeringMethodology}</td>
                            </tr>)
                        })}
                    </tbody>
                </table>

            </form>
        );
    }
}