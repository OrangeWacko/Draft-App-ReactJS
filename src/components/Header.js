import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import HouseIcon from '../assets/home.svg';

export default class DraftBoard extends Component {

    render() {
      const Managers  = this.props.managers;
      //console.log(JSON.stringify(Managers))
      return (
        <div>
          <div className="draft-nav ui secondary tiny menu">
            <div className="right menu">
              <a className="home-icon"><img src={HouseIcon} alt="Draft Manager" className="center" width="22"/></a>
              <a className="item" href="/manager">Manager</a>
              <a className="item active" href="/draft-board">Draft Board</a>
              <a className="item logout" href="#"> Log Out </a>
            </div>
          </div>
        </div>
      );
    }
}
