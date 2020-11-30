import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import OutsideAlerter from "../OutsideAlerter"
import CreateMenu from "./CreateMenu"

class Create extends Component {

    constructor(parent) {
        super(parent)

        this.state = {
            relevantSkills : [],
            name: "",
            skillToAdd: "",
            creating: false,
            domain: parent.domain,
            projectID: -1
        };

        this.handleCreate = this.handleCreate.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleAddSkill = this.handleAddSkill.bind(this)
        this.handleDeleteSkill = this.handleDeleteSkill.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleClear = this.handleClear.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)

    }

    handleCreate() {
        this.setState({creating: true})
    }

    handleCancel(event) {
        if (event.name !== "create") {
            this.setState({
                creating: false
            })
        }
    }

    handleSubmit() {
        const skillObjects = []
        for (let i = 0; i < this.state.relevantSkills.length; i++) {
            skillObjects.push({
                name: this.state.relevantSkills[i]
            })
        }
        fetch(this.state.domain + "project", {
            method: "POST",
            body: JSON.stringify({
                name: this.state.name,
                skills: skillObjects
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json()).then(id => {this.setState({projectID: id})
        })
    }

    handleChange(event) {
        let updatedState = this.state;
        updatedState[event.target.name] = event.target.value;
        this.setState(updatedState);
    }

    handleKeyPress(event) {
        if (event.charCode === 13){
          this.handleAddSkill()    
        } 
    }

    // Will eventually handle adding a skill to the relevant skills list
    handleAddSkill() {
        let updatedSkills = this.state.relevantSkills
        updatedSkills.push(this.state.skillToAdd)
        this.setState({
            relevantSkills: updatedSkills,
            skillToAdd: ""
        })
    }

    // Will eventually handle adding a skill to the relevant skills list
    handleDeleteSkill(event) {
        let updatedSkills = []
        for (let i = 0; i < this.state.relevantSkills.length; i++) {
            if (this.state.relevantSkills[i] !== event.target.name) {
                updatedSkills.push(this.state.relevantSkills[i])
            }
        }
        this.setState({
            relevantSkills: updatedSkills
        })
    }

    handleClear() {
        this.setState({
            relevantSkills : [],
            name: "",
            skillToAdd: ""
        })
    }

    render() {
        if (this.state.projectID !== -1) {
            return (<Redirect to={"/projectID=" + this.state.projectID} />)
        }
        let createMenu;
        if (this.state.creating) {
            createMenu =
                <OutsideAlerter onCancel={this.handleCancel}>
                    <div>
                        <CreateMenu
                            state={this.state}
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                            onCancel={this.handleCancel}
                            onAdd={this.handleAddSkill}
                            onDelete={this.handleDeleteSkill}
                            onClear={this.handleClear}
                            onKeyPress={this.handleKeyPress}
                        />
                    </div>
                </OutsideAlerter>
        } else {
            createMenu = null
        }
        return (
            <div className="grid-menu-item">
                <button className="create-button" name="create" onClick={this.handleCreate}>Or Start A New Event</button>
                {createMenu}
            </div>
        );
    }
}

export default Create
