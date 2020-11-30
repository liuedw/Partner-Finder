import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, useParams } from 'react-router-dom'
import './App.css'
import ParticipantPage from "./components/participant/ParticipantPage"
import ProjectPage from "./components/project/ProjectPage"

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" children={<ProjectPage />} exact/>
            <Route path="/projectID=:id" children={<Child />} />
          </Switch>
        </div> 
      </BrowserRouter>
    )
  }
}

function Child() {
  let { id } = useParams();

  return (
    <ParticipantPage projectID={id} />
  );
}

export default App;
