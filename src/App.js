import React, { Component } from 'react';
import './App.css';
import Participants from './components/Participants'
import Join from "./components/Join";
import Filter from "./components/Filter";

class App extends Component {
  render() {
    return (
        <div>
            <h1>Welcome to the Participants Page</h1>
              <div className="menu">
                <Filter />
                <Join />
              </div>
              <Participants />            
            </div>
    );
  }
}

export default App;
