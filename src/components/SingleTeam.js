import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Base} from './Base';

export default class SingleTeam extends Component {

  constructor(props) {
    super(props);
    this.state = {
      managers: [{"managerId":0}]
    }
  }

  componentDidMount() {
    this.managersRef = Base.syncState(`teamManagers`, {
      context: this,
      state: 'managers',
      asArray: true
    });
	}

  componentWillUnmount() {
		Base.removeBinding(this.managersRef);
	}
  render() {
  		let managers  = this.state.managers;


  		//const { managers = [] } = this.props.managers;
        const teamId = this.props.match.params.teamId;
        console.log('team ID here:' + teamId);

        console.log('managers:' + JSON.stringify(managers));
        let managerIndex = managers.findIndex(m => m.managerId == teamId);
        console.log(managerIndex);
        let Manager = managers[managerIndex];
        console.log('manager: ' + JSON.stringify(Manager));
        let managerName ='';
        let draftedAmount =0;
        let budget =200;
        let maxBid =185;
        let draftedPlayers=[];
        let playersList = '';
        if(managers.length > 1)
        {
        	managerName = Manager.managerName;
        	if(Manager.draftedPlayers) {
        		draftedPlayers = Manager.draftedPlayers;
        	}

        	budget = Manager.budget;
        	maxBid = Manager.maxBid;

        	if(draftedPlayers.length > 0 ) {
        		draftedAmount = Manager.draftedPlayers.length;
        		playersList = draftedPlayers.map((player, index) => {
					return (
						<li key={index}>{player.displayName} - {player.position} ({player.team}) <span>{player.finalBid}</span></li>
					)
				});
        	}
    	}

        return (
            <div className="draft-board board-wrapper">
				<div className="ui two column centered grid">
					<div className="sixteen wide column">
						<div className="single-team">
							<h3>{draftedAmount}<strong>/16</strong></h3>
							<h1>{managerName}</h1>
							<ul className="team-players">
							{playersList}
							</ul>
							<div>
								<h3>Budget: <sup>$</sup><strong>{budget}</strong></h3>
								<h3 className="max-bid">Max Bid: <sup>$</sup><strong>{maxBid}</strong>
								</h3>
							</div>
							<Link to="/draft-board"><button className="fluid ui green button">Back to Full Draft Board</button></Link>
						</div>
					</div>
				</div>
            </div>
        );
    }
}
