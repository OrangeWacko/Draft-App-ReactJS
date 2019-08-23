import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import {Base} from './components/Base';
import MainScreen from './components/MainScreen';
import Manager from './components/Manager';
import DraftBoard from './components/DraftBoard';
import SingleTeam from './components/SingleTeam';
import HouseIcon from './assets/home.svg';
import './styles/App.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';

export default class App extends Component {
  state = {
    managers: [],
    draftedPlayers :[]
  }

  updateManagers = (updatedManagersArray) => {
    this.setState({
      managers: updatedManagersArray
    });
  }

  componentDidMount() {
    this.managersRef = Base.syncState(`teamManagers`, {
      context: this,
      state: 'managers',
      asArray: true
    });

    // this.playersRef = Base.syncState(`draftedPlayers`, {
    //   context: this,
    //   state: 'draftedPlayers',
    //   asArray: true
    // });
  }

  componentWillMount() {

  }

  componentWillUnmount() {
    Base.removeBinding(this.managersRef);
    Base.removeBinding(this.playersRef);
  }

  render() {
    //2019: const drafted = this.state.draftedPlayers;
    //console.log(JSON.stringify(drafted));
    return (
      <Router>
        <div className="container">
          <div className="draft-nav ui secondary tiny menu">
            <div className="right menu">
              <NavLink exact activeClassName='active' to='/' className="home-icon"><img src={HouseIcon} alt="Draft Manager" className="center" width="22"/></NavLink>
              <NavLink exact activeClassName='active' to='/manager' className="item">Manager</NavLink>
              <NavLink exact activeClassName='active' to='/draft-board' className="item">Draft Board</NavLink>
              <a className="item logout" href="#"> Log Out </a>
            </div>
          </div>

          <Route exact path="/" component={MainScreen}/>
          <Route path="/manager" render={(props) => <Manager {...props} managers={this.state.managers} updateManagers={this.updateManagers} />} />
          <Route path="/draft-board" render={(props) => <DraftBoard {...props} managers={this.state.managers} />} />
          <Route path="/team/:teamId" render={(props) => <SingleTeam {...props} managers={this.state.managers} />}/>
        </div>
      </Router>
    );
  }
}

