import React, { Component } from 'react';
import ManagerIcon from '../assets/trainer.svg';
import {Base} from './Base';
import {Typeahead} from 'react-bootstrap-typeahead';
import update from 'react-addons-update';


export default class Manager extends Component {
	state = {
		currentDisplayName:'',
		currentBid:0,
		currentManagerId:0,
		currentPlayerId:0,
		currentPlayerTeam:'',
		currentPlayerPos:'',
		draftedPlayers:[],
		nflPlayers:[],
		managers:[]
	}


	handleSubmit = (e) =>  {
		e.preventDefault()

		//const previousDraftedPlayers = this.state.draftedPlayers
		const draftedPlayer = {
			displayName: this.state.currentDisplayName,
			finalBid: this.state.currentBid,
			managerId: this.state.currentManagerId,
			playerId: this.state.currentPlayerId,
			team: this.state.currentPlayerTeam,
			position: this.state.currentPlayerPos
	    }
	    /* Updating Budget Here */
	    const currentDrafted = this.state.draftedPlayers;
	   	const managers = this.state.managers;
        const managerIndex = managers.findIndex(m => m.managerId == this.state.currentManagerId);
        console.log(this.state.currentManagerId);
        const manager = managers[managerIndex];
        const updatedManager = update(managers[managerIndex], { budget: { $set: manager.budget - this.state.currentBid } });
        const updatedManagers = update(managers, { $splice: [[managerIndex, 1, updatedManager]] });


	    console.log('current drafted players: ' + JSON.stringify(currentDrafted));
	    //this.state.draftedPlayers = updatedDrafted;
	    this.setState({
	    	draftedPlayers: [...this.state.draftedPlayers, draftedPlayer],
	    	managers: updatedManagers,
			currentDisplayName:'',
			currentBid:0,
			currentManagerId:0,
			currentPlayerId:0,
			currentPlayerTeam:'',
			currentPlayerPos:'',

		});
		this._typeahead.getInstance().clear();

	    //this.state.draftedPlayers.push(draftedPlayer)
	    //this.setState({ draftedPlayers: [...previousDraftedPlayers, draftedPlayer]})

	}

	handleChange = (e) => {
		e.preventDefault()
		this.setState({
			[e.target.name]: e.target.value
		});
	}



	componentWillMount() {

	}

	componentDidMount() {
		/*const db = firebase.database().ref('fantasy-draft-2018');
		const nflPlayersFirebase = db.child('nflPlayers');*/
		this.managersRef = Base.syncState(`teamManagers`, {
	      context: this,
	      state: 'managers',
	      asArray: true
	    });

		this.nflPlayersRefs = Base.syncState(`nflPlayers`, {
		  context: this,
		  state: 'nflPlayers',
		  asArray: true
		});

		this.draftedRefs = Base.syncState(`draftedPlayers`, {
		  context: this,
		  state: 'draftedPlayers'
		});

		Base.listenTo('draftedPlayers', {
			context: this,
			asArray: true,
			then(players){
				// const managerIndex = managers.findIndex(m => m.managerId == this.state.currentManagerId);
				// console.log(this.state.currentManagerId);
				// const manager = managers[managerIndex];

				console.log('player added');
				const managersArray = this.state.managers;
				const draftedPlayersArray = this.state.draftedPlayers;

				let updatedManagersArray = [];
				//console.log(JSON.stringify(managersArray));

				managersArray.map((manager, index) => {
					let updatedManager = manager;
					let specificDraftedPlayers = [];
					let totalPrice = 0;
					const managerID = manager.managerId;
					console.log('current manager:' + JSON.stringify(manager) + ' manager id: ' + managerID);
					console.log('length array: ' + draftedPlayersArray.length);
					if(players.length > 0 || players !== 'undefined') {
						players.map((player, index) => {
						if(player.managerId == managerID) {
							totalPrice = totalPrice + player.finalBid;
							specificDraftedPlayers.push(player);
							}
						});
					}

					const totalTeamSize = specificDraftedPlayers.length;
					const maxBid = 200 - totalPrice - (15 - totalTeamSize);
					console.log('specific drafted players: ' + JSON.stringify(specificDraftedPlayers));
					console.log('max bid:' + maxBid);

					updatedManager.draftedPlayers = specificDraftedPlayers;
					updatedManager.maxBid = maxBid;
					console.log('updated Manager: ' + JSON.stringify(updatedManager));
					updatedManagersArray.push(updatedManager);
				});

				this.setState({
					managers: updatedManagersArray
				});
			}
		})

	}

	componentWillUnmount() {
		Base.removeBinding(this.nflPlayersRefs);
		Base.removeBinding(this.draftedRefs);
		Base.removeBinding(this.managersRefs);
	}

	isEmpty = (obj) => {
	    for(var key in obj) {
	        if(obj.hasOwnProperty(key))
	            return false;
	    }
	    return true;
	}

	render() {
		const currentPlayers = this.state.nflPlayers;
		//console.log(this.state.drafted);
	    return (
			<div className="manager manager-wrapper">
				<div className="inner-wrapper">
					<img src={ManagerIcon} alt="Draft Manager" className="center" width="140"/>
					<h1>Draft Manager</h1>
					<div className="ui section divider"></div>
					<div className="add-player">
						<div className="ui form">
							<form onSubmit={this.handleSubmit}>
								<div className="search">
									<div className="search-players" style={{width: 450}}>
									<Typeahead onChange={(selected) => {
										const currentPlayer = selected[0];
										if(!this.isEmpty(currentPlayer)) {
											this.setState({
												currentDisplayName: currentPlayer["displayName"],
												currentPlayerId:currentPlayer["key"],
												currentPlayerTeam:currentPlayer["team"],
												currentPlayerPos:currentPlayer["position"]
											});
										}

										//console.log('selected value ' + JSON.stringify(selected) + currentP["fname"]);
									}}
										ref={(ref) => this._typeahead = ref}
										options={currentPlayers}
										labelKey="displayName"
										placeholder="Search Players..."
										renderMenuItemChildren={(option) => (
										<div>
											{option.displayName} - <strong>{option.position} ({option.team})</strong>
										</div>
							          )} />
									</div>
								</div>
								<div className="fields">
									<div className="eleven wide field">
										<label>Team Manager</label>
										<select value={this.state.currentManagerId} name="currentManagerId" onChange={this.handleChange} className="custom-select">
											<option value="0">Select Manager...</option>
											<option value="1">Andrew Gillman</option>
											<option value="2">Clayton Brady</option>
											<option value="3">Cliff Braton</option>
											<option value="4">Cody Hill</option>
											<option value="5">Cord Overton</option>
											<option value="7">Dan Swenson</option>
											<option value="9">Jaclyn Overton</option>
											<option value="10">Jessica Brady</option>
											<option value="11">Matthew Smith</option>
											<option value="12">Michelle Wolf</option>
											<option value="13a">Nate Adamson</option>
											<option value="14">Rachel Bowley</option>
											<option value="15">Renae meines</option>
											<option value="8">Roman Serebryakov</option>
											<option value="16">Wade Thompson</option>
											<option value="6">Daddy Waggs</option>
										</select>
										</div>
									<div className="five wide field">
										<label>Winning Bid</label>
										<div className="ui right labeled input">
											<input type="text" placeholder="100" name="currentBid" value={this.state.currentBid} onChange={this.handleChange} />
										 	<label className="ui label">$</label>
										</div>
									</div>
								</div>
								<button className="fluid large ui green button" type="submit" onClick={this.handleSubmit}>Submit Player</button>
							</form>
						</div>
					</div>
				</div>
			</div>
			);
  	}
}
