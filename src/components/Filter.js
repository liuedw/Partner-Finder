import React, { Component } from "react";
import FilterParticipant from "./FilterParticipant";
import OutsideAlerter from "./OutsideAlerter";

var initialState = {
    filtering: false,
    filteredSkills: [],
    relevantSkills: []
};

export default class Filter extends Component {


    constructor() {
        super();
        
        fetch("http://localhost:8080/api/skills?projectID=0").then(result => result.json()).then(json => {
            for (var i = 0; i < json.length; i++) {
                initialState.relevantSkills.push(json[i]);
            }
        })

        this.state = initialState;
        this.handleFilter = this.handleFilter.bind(this)
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }

    // IDK if  this is needed
    componentDidMount() {
        fetch("http://localhost:8080/api/skills?projectID=0").then(result => result.json()).then(json => {
            this.setState({relevantSkills: json})
        })
    }

    // Done
    handleCancel() {
        this.setState(initialState);
        this.setState({filteredSkills: []})
    }

    // This should somehow communicate with Participants.js to show fewer... or just use the URL
    handleSubmit() {

    }

    // Done
    handleCheck(event) {
        if (event.target.checked) {
            let updatedFilter = this.state.filteredSkills;
            updatedFilter.push({
                id: event.target.id,
                name: event.target.name
            })
            this.setState({filteredSkills: updatedFilter})
        } else {
            this.setState({
                filteredSkills: this.state.filteredSkills.filter((skill) => skill.id !== event.target.id)
            })
        }
    }

    // Done
    handleFilter() {
        if (! this.state.filtering) {
            this.setState(
                {filtering: true}
            );
        }
    }

    render() {
        var filterMenu;
        if (this.state.filtering) {
            filterMenu =
                <OutsideAlerter onCancel={this.handleCancel}>
                    <div>
                        <FilterParticipant
                            state={this.state}
                            onSubmit={this.handleSubmit}
                            onCancel={this.handleCancel}
                            onClick={this.handleCheck}
                        />
                    </div>
                </OutsideAlerter>
        } else {
            filterMenu = null
        }
        return (
            <div className = "menu_item">
                <button className="filter-button" onClick={this.handleFilter}>Filter By Skill</button>
                {filterMenu}
            </div>
        );
    }


}
