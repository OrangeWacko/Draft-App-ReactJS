import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {Base} from './components/Base';
import MainScreen from './components/MainScreen';
import Manager from './components/Manager';
import DraftBoard from './components/DraftBoard';
import SingleTeam from './components/SingleTeam';
import './styles/App.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';

export default class App extends Component {
  state = {
    managers: [],
    draftedPlayers :[]
  }

  componentDidMount() {

  }

  componentWillMount() {
    this.managersRef = Base.syncState(`teamManagers`, {
      context: this,
      state: 'managers',
      asArray: true
    });

    this.playersRef = Base.syncState(`draftedPlayers`, {
      context: this,
      state: 'draftedPlayers',
      asArray: true
    });
  }

  componentWillUnmount() {
    Base.removeBinding(this.managersRef);
    Base.removeBinding(this.playersRef);
  }

  render() {
    const drafted = this.state.draftedPlayers;
    //console.log(JSON.stringify(drafted));
    return (
      <Router>
        <div className="container">
          <Route exact path="/" component={MainScreen}/>
          <Route path="/manager" render={(props) => <Manager {...props} managers={this.state.managers} />} />
          <Route path="/draft-board" render={(props) => <DraftBoard {...props} managers={this.state.managers} />} />
          <Route path="/team/:teamId" render={(props) => <SingleTeam {...props} managers={this.state.managers} />}/>
        </div>
      </Router>
    );
  }
}

