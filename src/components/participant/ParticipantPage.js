import React, { Component } from "react";
import { Link } from "react-router-dom"
import Filter from "./Filter";
import Join from "./Join";
import Participants from "./Participants";

const domain = "http://localhost:8080/api/"

class ParticipantPage extends Component {

    constructor(props) {
        super(props)
        // Get all the skills associated with the project


        // Create initial state
        this.state = {
            projectID: props.projectID,
            projectName: "",
            participants: [],
            relevantSkills: [],
            filteredSkills: [],
            fetchedParticipants: false,
            fetchedSkills: false,
            fetchedName: false
        }

        this.updateFilters = this.updateFilters.bind(this)
        this.getFilters = this.getFilters.bind(this)
    }

    componentDidMount() {
        fetch(domain + "participants?projectID=" + this.state.projectID).then(result => result.json()).then(json => {
            const users = []
            for (let i = 0; i < json.length; i++) {
                let person = json[i]
                let skills = person.skills
                let skillArr = []
                let skillIDs = []
                for (let j = 0; j < skills.length; j++) {
                    skillArr.push(skills[j].name)
                    skillIDs.push(skills[j].id)
                }
                users.push({
                    id: person.id,
                    name: person.name,
                    contact: person.contact,
                    skills: skillArr.join(", "),
                    skillIDs: skillIDs,
                    greeting: person.message,
                    hashword: person.hashword
                })
            }
            this.setState({participants: users, fetchedParticipants: true})
        })

        fetch(domain + "skills?projectID=" + this.state.projectID).then(result => result.json()).then(json => {
            const skills = []
            for (let i = 0; i < json.length; i++) {
                skills.push(json[i])
            }
            this.setState({relevantSkills: skills, fetchedSkills: true})
        })
        
        fetch(domain + "name?projectID=" + this.state.projectID).then(result => result.text()).then(json => {
            this.setState({projectName: json, fetchedName: true})
        })


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
        if (!this.state.fetchedParticipants || !this.state.fetchedSkills || !this.state.fetchedName) {
            return null
        }
        return (
            <div>
                <div className="back-to-home-div">
                    <Link to="/" className="back-to-home">&lt; Back</Link>
                </div>
                <h1>{this.state.projectName} Landing Page</h1>
                <h2>Share this project: {window.location.href}</h2>
                <div className="menu">
                    <Filter props={this.state} handleSubmit={this.updateFilters}/>
                    <Join props={this.state} domain={domain}/>
                </div>
                <Participants props={this.state} getFilters={this.getFilters}/>
            </div>
        );
    }
}

export default ParticipantPage;
