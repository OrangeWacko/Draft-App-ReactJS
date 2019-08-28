import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {Base, app} from './components/Base';
import MainScreen from './components/MainScreen';
import Login from './components/Login';
import Welcome from './components/Welcome';
import Manager from './components/Manager';
import Header from './components/Header';
import DraftBoard from './components/DraftBoard';
import SingleTeam from './components/SingleTeam';
import DraftedPlayers from './components/DraftedPlayers';
import './styles/App.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      managers: [],
      draftedPlayers :[],
      authenticated: false,
      user: null
    }
  }



  // updateManagers = (updatedManagersArray) => {
  //   this.setState({
  //     managers: updatedManagersArray
  //   });
  // }

  updateAuthenticated = (userStatus) => {
    // this.setState(userStatus)
    // console.log('user was authenticated')
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
    const mainEmail = '' + process.env.REACT_APP_MASTER_EMAIL + '';
    //console.log(mainEmail);
    this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
      if (user && user.email === mainEmail) {
        this.setState({
          authenticated: true,
          user: user.email
        })
      } else {
        this.setState({
          authenticated: false,
          user: null
        })
      }
    })
  }

  componentWillMount() {

  }

  componentWillUnmount() {
    Base.removeBinding(this.managersRef);
    Base.removeBinding(this.playersRef);
    this.removeAuthListener()
  }

  render() {
    //2019: const drafted = this.state.draftedPlayers;
    //console.log(JSON.stringify(drafted));
    return (
      <Router>
        {
          this.state.authenticated ? (
          <div className="container logged">
            <Header />
            <Route exact path="/" component={MainScreen}/>
            <Route path="/manager" render={(props) => <Manager {...props} />} />
            <Route path="/draft-board" render={(props) => <DraftBoard {...props} managers={this.state.managers} />} />
            <Route path="/team/:teamId" render={(props) => <SingleTeam {...props} />}/>
            <Route path="/drafted-players" component={DraftedPlayers}/>
          </div>
          ) : (
          <div className="container not-logged">
            <Route exact path="/" component={Welcome}/>
            <Route path="/login" component={Login}/>
          </div>
          )
        }
      </Router>
    );
  }
}

