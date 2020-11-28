import React, { Component } from 'react';
import './App.css';
import ParticipantPage from "./components/participant/ParticipantPage";

class App extends Component {
  render() {
    return (
        <ParticipantPage projectID={0} />
    );
  }
}

export default App;
