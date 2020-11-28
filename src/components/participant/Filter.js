import React, { Component } from "react";
import FilterMenu from "./FilterMenu";
import OutsideAlerter from "../OutsideAlerter";

export default class Filter extends Component {


    constructor(parent) {
        super(parent);

        // Get skills associated with project
        this.state = {
            filtering: false,
            filteredSkills: [],
            relevantSkills: parent.props.relevantSkills
        };

        this.handleFilter = this.handleFilter.bind(this)
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }

    // Done
    handleCancel(event) {
        if (event.target.name !== "open filter") {
            if (event.target.name === "clear") {
                this.setState({filteredSkills: []}, this.handleSubmit)
            } else {
                this.setState({filtering: false}, this.handleSubmit);
            }
        }
    }

    // This should somehow communicate with Participants.js to show fewer... or just use the URL
    handleSubmit() {
        this.props.handleSubmit(this.state.filteredSkills)
    }

    // Done
    handleCheck(event) {
        console.log(event.target.id)
        console.log(event.target.checked)
        let updatedFilter;
        if (event.target.checked) {
            updatedFilter = this.state.filteredSkills;
            updatedFilter.push(parseInt(event.target.id))
        } else {
            updatedFilter = []
            for (let i = 0; i < this.state.filteredSkills.length; i++) {
                let id = this.state.filteredSkills[i]
                if (parseInt(id) === parseInt(event.target.id)) {
                    continue
                }
                updatedFilter.push(id)
            }
        }
        this.setState({filteredSkills: updatedFilter}, this.handleSubmit)
    }

    // Done
    handleFilter() {
        if (! this.state.filtering) {
            this.setState({filtering: true})
        } else {
            this.setState({filtering: false})
        }
    }

    getFilter() {
        return this.state.filteredSkills
    }

    render() {
        let filterMenu;
        if (this.state.filtering) {
            filterMenu =
                <OutsideAlerter onCancel={this.handleCancel}>
                    <div>
                        <FilterMenu
                            state={this.state}
                            onSubmit={this.handleSubmit}
                            onCancel={this.handleCancel}
                            onChange={this.handleCheck}
                            getFilter={this.getFilter}
                        />
                    </div>
                </OutsideAlerter>
        } else {
            filterMenu = null
        }
        return (
            <div className = "menu_item">
                <button className="filter-button" name="open filter" onMouseUp={this.handleFilter}>Filter By Skill</button>
                {filterMenu}
            </div>
        );
    }


}
