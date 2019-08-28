import React, { Component } from 'react';
import {app} from './Base';
import { NavLink, Redirect } from 'react-router-dom';
import HouseIcon from '../assets/home.svg';

export default class DraftBoard extends Component {

    state = {
      redirect: false
    }

    logOut = () => {
      console.log('clicking');

      app.auth().signOut()
      this.setState ({
        redirect: true
      })
    }


    renderRedirect = () => {
      if (this.state.redirect) {
        return <Redirect to='/' />
      }
    }

    render() {
      return (
        <div className="draft-nav ui secondary tiny menu">
          {this.renderRedirect()}
          <div className="right menu">
            <NavLink exact activeClassName='active' to='/' className="home-icon"><img src={HouseIcon} alt="Draft Manager" className="center" width="22"/></NavLink>
            <NavLink exact activeClassName='active' to='/manager' className="item">Manager</NavLink>
            <NavLink exact activeClassName='active' to='/draft-board' className="item">Draft Board</NavLink>
            <NavLink exact activeClassName='active' to='/drafted-players' className="item">Drafted</NavLink>
            <button className="item logout" onClick={this.logOut} >Log Out</button>
          </div>
        </div>
      );
    }
}
