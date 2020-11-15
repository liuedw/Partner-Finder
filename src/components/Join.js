import React, { Component } from "react";
import AddParticipant from "./AddParticipant";
import OutsideAlerter from "./OutsideAlerter";

var initialState = {
    name: "",
    contact: "",
    skills: "",
    greeting: "",
    relevantSkills: [],
    checkedSkills: [],
    password: "",
    confirmation: "",
    adding: false
};

const bcrypt = require('bcryptjs');
const saltRounds = 10;

export default class Join extends Component {


    constructor() {
        super();
        
        fetch("http://localhost:8080/api/skills?projectID=0").then(result => result.json()).then(json => {
            for (var i = 0; i < json.length; i++) {
                initialState.relevantSkills.push(json[i]);
            }
            this.setState({relevantSkills: json})
        })

        this.state = initialState;
        this.handleAdd = this.handleAdd.bind(this)
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }

    handleCancel() {
        this.setState(initialState);
        this.setState({checkedSkills: []})
    }

    handleSubmit() {
        if (this.state.password === this.state.confirmation && this.state.password !== "") {
            var hash = bcrypt.hashSync(this.state.password, saltRounds);
            fetch("http://localhost:8080/api/add?projectID=0", {
                method: "POST",
                body: JSON.stringify({
                    name: this.state.name,
                    contact: this.state.contact,
                    skills: this.state.checkedSkills,
                    message: this.state.greeting,
                    hashword: hash,
                    salt: "a"
                }),
                headers: { 
                    "Content-type": "application/json; charset=UTF-8"
                } 
            }).then(response => response.json())
            this.setState(initialState)
            this.setState({checkedSkills: []})
            window.location.reload()
        }
    }

    handleChange(event) {
        let updatedState = this.state;
        updatedState[event.target.name] = event.target.value;
        this.setState(updatedState);
    }

    handleCheck(event) {
        if (event.target.checked) {
            let updatedSkills = this.state.checkedSkills;
            updatedSkills.push({
                id: event.target.id,
                name: event.target.name
            })
            this.setState({checkedSkills: updatedSkills})
        } else {
            this.setState({
                checkedSkills: this.state.checkedSkills.filter((skill) => skill.id !== event.target.id)
            })
        }
    }

    handleAdd() {
        if (! this.state.adding) {
            this.setState(
                {adding: true}
            );
        }
    }

    render() {
        var joinMenu;
        if (this.state.adding) {
            joinMenu =
                <OutsideAlerter onCancel={this.handleCancel}>
                    <div>
                        <AddParticipant
                            state={this.state}
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                            onCancel={this.handleCancel}
                            onClick={this.handleCheck}
                        />
                    </div>
                </OutsideAlerter>
        } else {
            joinMenu = null
        }
        return (
            <div className = "menu_item">
                <button className="join-button" onClick={this.handleAdd}>Join This Project</button>
                {joinMenu}
            </div>
        );
    }
}
