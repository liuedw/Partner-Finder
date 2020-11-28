import React, { Component } from "react";
import JoinMenu from "./JoinMenu";
import OutsideAlerter from "../OutsideAlerter";

const initialState = {
    projectID: -1,
    domain: "",
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

class Join extends Component {


    constructor(parent) {
        super(parent)

        initialState.projectID = parent.props.projectID
        initialState.relevantSkills = parent.props.relevantSkills
        initialState.domain = parent.domain
        this.state = initialState;


        this.handleAdd = this.handleAdd.bind(this)
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);

    }

    handleCancel(event) {
        if (event.name !== "open join") {
            this.setState(initialState);
            this.setState({checkedSkills: []})
        }
    }

    handleSubmit() {
        if (this.state.password === this.state.confirmation && this.state.password !== "") {
            const hash = bcrypt.hashSync(this.state.password, saltRounds);
            fetch(this.state.domain + "add?projectID=" + this.state.projectID, {
                method: "POST",
                body: JSON.stringify({
                    name: this.state.name,
                    contact: this.state.contact,
                    skills: this.state.checkedSkills,
                    message: this.state.greeting,
                    hashword: hash
                }),
                headers: { 
                    "Content-type": "application/json; charset=UTF-8"
                } 
            }).then(response => response.json())
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
            this.setState({adding: true});
        } else {
            this.setState(initialState);
            this.setState({checkedSkills: []})
        }
    }

    render() {
        let joinMenu;
        if (this.state.adding) {
            joinMenu =
                <OutsideAlerter onCancel={this.handleCancel}>
                    <div>
                        <JoinMenu
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
                <button className="join-button" name="open join" onClick={this.handleAdd}>Join This Project</button>
                {joinMenu}
            </div>
        );
    }
}

export default Join
