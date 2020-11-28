import React, { Component } from "react";
import Participant from "./Participant";

const bcrypt = require('bcryptjs');

export default class Participants extends Component {

    constructor(parent) {
        super(parent);
        this.state = {
            participants: parent.props.participants,
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
                    const deletedID = parseInt(this.state.deleting);
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
                    let meets_reqs = true
                    let filter = this.props.getFilters()
                    for (let i = 0; i < filter.length; i++) {
                        if (!participant.skillIDs.includes(parseInt(filter[i]))) {
                            meets_reqs = false
                            break
                        }
                    }
                    if (!meets_reqs) {
                        return null
                    }
                    return (
                        <li className="participant-item" key={participant.id}>
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
