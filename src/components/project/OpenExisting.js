import React, { Component } from "react"
import { Redirect } from "react-router-dom"

class OpenExisting extends Component {

    constructor(parent) {
        super(parent)

        this.state = {
            id: "",
            submitted: false
        };

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
    }

    handleChange(event) {
      this.setState({id: event.target.value})
    }

    handleSubmit() {
      this.setState({submitted: true})
    }

    handleKeyPress(event) {
      if (event.charCode === 13){
        this.handleSubmit()    
      } 
  }

    render() {
        return (this.state.submitted ?
          <Redirect to={"/projectID=" + this.state.id} /> :
          <div className="grid-menu-item">
            <label className="checkbox-label" for="id">Enter the event ID here:</label>
            <div className="input-button-grid">
              <input
                  name="id"
                  id="id"
                  value={this.state.id}
                  onKeyPress={this.handleKeyPress}
                  onChange={this.handleChange}
              />
              <button className="submit" onClick={this.handleSubmit}>Submit</button>    
            </div>        
          </div>
        );
    }
}

export default OpenExisting
