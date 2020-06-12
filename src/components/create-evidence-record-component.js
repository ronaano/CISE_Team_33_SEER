import React, { Component } from 'react';
import axios from 'axios';

export default class CreateEvidenceRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            author: "",
            title: "",
            month: "",
            year: "",
            description: "",
            benefit: "",
            context: "",
            outcome: "",
            resultValue: "Supports the Benefit/Outcome",
            remethodValue: "Case Study",
            participantsValue: "Undergraduate Students",
            semethodValue: "TDD",
            semethodologyValue: "Scrum",
            result: ["Supports the Benefit/Outcome",
                "Does not Support the Benefit/Outcome"],
            remethod: ["Case Study", "Field Observation", "Experiment",
                "Interview", "Survey"],
            participants: ["Undergraduate Students", "Postgraduate Students",
                "Pracitioners"],
            semethod: ["TDD", "BDD", "Pair Programming", "Planning Poker",
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
                "Values Driven Development", "Product Driven Development", "Agile"]
        };
        this.handleFormEvent = this.handleFormEvent.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }



    componentDidMount() {
        axios.get('/moderatedarticles/' + this.props.match.params._id)
            .then(res => {
                this.setState({
                    author: res.data.author,
                    title: res.data.title,
                    month: res.data.month,
                    year: res.data.year
                });
            })
            .catch(err => console.log(err));
    }

    handleFormEvent(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    async onSubmit(event) {
        event.preventDefault();
        const evidencerecord = {
            Author: this.state.author,
            Title: this.state.title,
            Month: this.state.month,
            Year: this.state.year,
            Description: this.state.description,
            Rating: 0,
            Participants: this.state.participantsValue,
            Outcome: this.state.outcome,
            Context: this.state.context,
            Result: this.state.resultValue,
            ResearchMethod: this.state.remethodValue,
            SoftwareEngineeringMethod: this.state.semethodValue,
            SoftwareEngineeringMethodology: this.state.semethodologyValue
        };
        await axios.post('/evidencerecords/add'
            , evidencerecord)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));

        axios.delete('/moderatedarticles/'
            + this.props.match.params._id)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>
                        Author:
              <input name="author"
                            placeholder="Ex: John Appleseed"
                            value={this.state.author}
                            onChange={this.handleFormEvent} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Title:
                <input name="title"
                            placeholder="Ex: Test Driven Development"
                            value={this.state.title}
                            onChange={this.handleFormEvent} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Month:
                <input name="month"
                            placeholder="Ex: dec(For December)"
                            value={this.state.month}
                            onChange={this.handleFormEvent} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Year:
                <input name="year"
                            placeholder="Ex: 2011"
                            value={this.state.year}
                            onChange={this.handleFormEvent} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Description:
              <input name="description"
                            placeholder="Describe the evidence"
                            value={this.state.description}
                            onChange={this.handleFormEvent} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Context:
              <input name="context"
                            placeholder="When was the evidence taken
                            , who took it etc."
                            value={this.state.context}
                            onChange={this.handleFormEvent} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Outcome:
              <input name="outcome"
                            placeholder="Outcome of this under test"
                            value={this.state.outcome}
                            onChange={this.handleFormEvent} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Result:
              <select name="resultValue"
                            value={this.state.resultValue}
                            onChange={this.handleFormEvent} >
                            {this.state.result.map(options => {
                                return <option key={options} value={options}>
                                    {options}</option>
                            }
                            )}
                        </select>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Research Method:
              <select name="remethodValue"
                            value={this.state.remethodValue}
                            onChange={this.handleFormEvent} >
                            {this.state.remethod.map(options => {
                                return <option key={options} value={options}>
                                    {options}</option>
                            }
                            )}
                        </select>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Participants:
              <select name="participantsValue"
                            value={this.state.participantsValue}
                            onChange={this.handleFormEvent} >
                            {this.state.participants.map(options => {
                                return <option key={options} value={options}>
                                    {options}</option>
                            }
                            )}
                        </select>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Software Engineering Method:
              <select name="semethodValue"
                            value={this.state.semethodValue}
                            onChange={this.handleFormEvent} >
                            {this.state.semethod.map(options => {
                                return <option key={options} value={options}>
                                    {options}</option>
                            }
                            )}
                        </select>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Software Engineering Methodology:
              <select name="semethodologyValue"
                            value={this.state.semethodologyValue}
                            onChange={this.handleFormEvent} >
                            {this.state.semethodology.map(options => {
                                return <option key={options} value={options}>
                                    {options}</option>
                            }
                            )}
                        </select>
                    </label>
                </div>
                <input type="submit" value="Submit" />
            </form>
        );
    }

}
