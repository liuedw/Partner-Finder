import React, { Component } from "react";
import Participant from "./Participant";

const bcrypt = require('bcryptjs');
const saltRounds = 10;

export default class Participants extends Component {

    constructor() {
        super();
        this.state = { 
            participants: [],
            deleting: -1,
            password: "",
            checked: -1,
            invalid: false
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:8080/api/participants?projectID=0").then(result => result.json()).then(json => {
            const user = [];
            for (var i = 0; i < json.length; i++) {
                let person = json[i];
                let skills = person.skills;
                let skillArr = [];
                for (var j = 0; j < skills.length; j++) {
                    skillArr.push(skills[j].name)
                }
                user.push({
                    id: person.id,
                    name: person.name,
                    contact: person.contact,
                    skills: skillArr.join(", "),
                    greeting: person.message,
                    hashword: person.hashword
                })
            }
            this.setState({participants : user})
        })
    }

    handleDelete(event) {
        this.setState({deleting: event.target.id})
    }

    handleCancel() {
        this.setState({
            deleting: -1,
            checked: -1,
            password: "",
            invalid: false
        })
    }

    handleCheck(event) {
        if (event.target.checked) {
            this.setState({checked: event.target.id})
        } else {
            this.setState({checked: -1})
        }
    }

    handleChange(event) {
        this.setState({
            password: event.target.value
        });
    }

    handleSubmit(event) {
        if (parseInt(this.state.deleting) === parseInt(this.state.checked)) {
            bcrypt.compare(this.state.password, event.target.value).then((res) => {
                if (res) {
                    var deletedID = parseInt(this.state.deleting)
                    fetch("http://localhost:8080/api/delete", {
                        method: "POST",
                        body: JSON.stringify({
                            id: deletedID,
                            hashword: event.target.value
                        }),
                        headers: { 
                            "Content-type": "application/json; charset=UTF-8"
                        } 
                    }).then(response => response.json())
                    window.location.reload()
                } else {
                    this.setState({invalid: true})
                }
            });
        }
        
    }

    render() {
        return (
            <ul className="participants">
                {this.state.participants.map(participant => {
                    return (
                        <li className="participant-item">
                            <Participant 
                            state={this.state}
                            participant={participant}
                            key={participant.id}
                            onDelete={this.handleDelete}
                            onCancel={this.handleCancel}
                            onCheck={this.handleCheck}
                            onSubmit={this.handleSubmit}
                            onChange={this.handleChange}/>
                        </li>
                    )
                })}
            </ul>
        );
    }
}
