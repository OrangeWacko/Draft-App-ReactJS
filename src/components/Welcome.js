import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import MainIcon from '../assets/main-icon.svg';

export default class Welcome extends Component {
  render() {
    return (
      <div className="login login-wrapper">
        <div className="inner-wrapper">
        <div className="main-icon">
          <img src={MainIcon} alt="Welcome to Fantasy Football Manager" className="center"/>
        </div>
        <h2>Welcome to F.A.M.</h2>
        <p>Tired of keeping track of your live auction drafts on the Excel spreadsheet? Welcome to free-to-enjoy NFL Fantasy Auction Manager platform for anyone who wants to manage their live drafts for their league.</p>
        <p><small>Please support this project by giving a small <a target="_blank" href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=MZNZY2CFRZPAY&source=url"><strong>Donation</strong></a> to help me pay for the endless energy drinks and cheap coffee during late
        hours of creating and improving this project for Fantasy Football fans like me.</small></p>
        <div className="center">
          <Link className="ui big primary button" to="/login">Login/Register</Link>
        {/*<button class="ui big primary button">Donate</button>*/}
        </div>
        </div>
      </div>
      )
  };
}
