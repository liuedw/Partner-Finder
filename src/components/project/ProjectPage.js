import React, { Component } from "react"
import Create from "./Create"
import OpenExisting from "./OpenExisting"

const domain = "http://localhost:8080/api/"

class ProjectPage extends Component {

    constructor(props) {
        super(props)

        // Create initial state
        this.state = {
            relevantSkills: [],
            returnID: props.getID
        }

        this.getFilters = this.getFilters.bind(this)
    }

    // Make filter list match checked boxes
    // Then filter out the participants from shownParticipants to match filter
    updateFilters(filteredSkills) {
        this.setState({filteredSkills: filteredSkills})
    }

    getFilters() {
        return this.state.filteredSkills
    }

    render() {
        return (
            <div>
                <h1>Partner Finder</h1>
                <h2>Placeholder description</h2>
                <div className="grid-menu">
                    <OpenExisting props={this.state}/>
                </div>
                <div className="grid-menu">
                    <Create props={this.state} domain={domain}/>
                </div>
            </div>
        );
    }
}

export default ProjectPage;
