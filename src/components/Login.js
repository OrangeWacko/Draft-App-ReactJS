import React, { Component } from 'react';
import {app} from './Base';
import { Redirect } from 'react-router-dom';

export default class Login extends Component {

  state = {
    redirect: false
  }

  authWithEmailPassword = (event) => {
    event.preventDefault()
    const email = this.emailField.value
    const password = this.passwordField.value

    // console.table([{
    //   email: this.emailField.value,
    //   password: this.passwordField.value
    // }]);

    app.auth().fetchSignInMethodsForEmail(email)
    .then((providers) => {
      if(providers.length === 0) {
        return app.auth().createUserWithEmailAndPassword(email, password)
      } else {
        return app.auth().signInWithEmailAndPassword(email, password)
      }
    })
    .then((user) => {
      if(user) {
        this.setState({
          redirect: true
        })
      }
    })
  }

  componentDidMount() {
  }

  render() {

    return (
      this.state.redirect === true ?
      ( <Redirect to='/' />) :

      <div className="login login-wrapper">
        <div className="inner-wrapper">
          <h2>Login/Register</h2>
          <p>If you don't have an Account already, this form will also register a new Account.</p>
          <form onSubmit={(event)=> {this.authWithEmailPassword(event)}} ref={(form)=>{ this.loginForm = form }} className="ui form login-form">
            <div className="field">
              <label>Email</label>
              <input type="email" name="email" placeholder="fantasyfootball@example.com" ref={(input)=>{this.emailField = input}}/>
            </div>
            <div className="field">
              <label>Password</label>
              <input type="password" name="password" placeholder="" ref={(input)=>{this.passwordField = input}}/>
            </div>
            <div className="center">
              <input className="ui primary big button" type="submit" value="Submit" style={{marginTop: "15px"}}/>
            </div>
          </form>
        </div>
      </div>
      )
  };
}
