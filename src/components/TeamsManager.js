import React, { Component } from 'react';
import {Base, app} from './Base';
import { Icon } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";



export default class TeamsManager extends Component {
	constructor(props) {
    super(props);
    this.state = {
      managers: [],
      rosterSize : 10,
      user: null
    }
    this.removeTeam = this.removeTeam.bind(this);
    this.nameInput = React.createRef();
    this.budgetInput = React.createRef();
  }

  ShowTeams = () => {
      const managers = this.state.managers;
      console.log(managers);
      if(managers != null && managers.length) {
        return (<div className="ui centered grid teams-row">
        {managers.map((manager, index) => (
          <div className="sixteen wide mobile sixteen wide tablet eight wide computer column single-team-card" data-index={index} key={index}>
            <div className="team-inner">
            {manager.managerName} <span className="budget">(${manager.budget})</span>
            <Icon icon="trash" className="delete-btn" value={index} onClick={() => this.removeTeam(index)}/></div>
            </div>
        ))}
        </div>);
      }
  };

  handleRosterChange = e => {
    e.preventDefault();
    this.setState({
      rosterSize: e.target.value
    });
  };

  addTeam = e => {
    e.preventDefault();
    let managersArray = this.state.managers;
    const nameValue = this.nameInput.current.value;
    const budgetValue = Number(this.budgetInput.current.value);
    let teamID = managersArray.length + 1;
    const newTeam = {
      budget: budgetValue,
      managerName: nameValue,
      managerId: teamID
    }
    console.log(nameValue);
    console.log(budgetValue);
    console.log(managersArray);
    managersArray.push(newTeam);
    this.setState( {
      managers: managersArray
    });
  }
  
  removeTeam(index) {
    //e.preventDefault();
    console.log('clicked:' + index );
    let managerIndex = index + 1;
    let managers = this.state.managers;
    console.log(managers);
    let updatedManagers = [];
    updatedManagers = managers.filter(function(manager) { return manager.managerId !== managerIndex; });
    console.log(updatedManagers);
  }

  
  componentDidMount() {
    this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user: user,
          authenticated: true
        })

        this.teamsRef = Base.syncState(`teamManagers/${this.state.user.uid}`, {
          context: this,
          state: `managers`,
          asArray: true
        });

        this.sizeRef = Base.syncState(`rosters/${this.state.user.uid}/rosterSize`, {
          context: this,
          state: `rosterSize`
        });
      } else {
        this.setState({
          user: null,
          authenticated: false
        })
      }
    })
  }

  componentWillUnmount() {
    Base.removeBinding(this.sizeRef);
    Base.removeBinding(this.teamsRefs);
  }

	render() {
		return (
      
			<div className="manager manager-wrapper">
       
        <div className="ui grid team-manager">
          <div className="sixteen wide mobile eight wide tablet six wide computer column">
            <div className="ui form">
              <div className="fields centered">
              <div className="inline field">
                <label>Roster size</label>
                  <select
                  className="custom-select"
                  value={this.state.rosterSize}
                  name="currentRosterSize"
                  onChange={this.handleRosterChange}
                  >
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                  </select>
                </div>
                </div>
                
            </div>
            <h1>Add Team</h1>
            <div className="ui section divider"></div>
            <div className="add-team">
              <div className="ui form">

                <form onSubmit={this.handleSubmit}>
                  <div className="fields">
                    <div className="eleven wide field">
                      <label>Team name</label>
                      <input type="text" placeholder="Name" name="Name" ref={this.nameInput}/>
                    </div>
                    <div className="five wide field">
                      <label>Team Budget</label>
                      <div className="ui right labeled input">
                        <input type="number" placeholder="0" ref={this.budgetInput}/>
                        <label className="ui label">$</label>
                      </div>
                    </div>
                  </div>
                  <button className="fluid large ui green button" type="submit" onClick={this.addTeam}>Add Team</button>
                </form>
              </div>
            </div>
          </div>

          <div className="sixteen wide mobile eight wide tablet ten wide computer column">{this.ShowTeams()}</div>
        </div>
			</div>
		);
  }
}
