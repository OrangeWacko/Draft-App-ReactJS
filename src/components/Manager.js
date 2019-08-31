import React, { Component } from "react";
import ManagerIcon from "../assets/trainer.svg";
import { Base } from "./Base";
import { Typeahead } from "react-bootstrap-typeahead";

export default class Manager extends Component {
  state = {
    currentDisplayName: "",
    currentBid: null,
    currentManagerId: 0,
    currentPlayerId: 0,
    currentPlayerTeam: "",
    currentPlayerPos: "",
    draftedPlayers: [],
    nflPlayers: [],
    managers: [],
    errorMessage: ""
  };

  handleSubmit = e => {
    e.preventDefault();

    //const previousDraftedPlayers = this.state.draftedPlayers
    const draftedPlayer = {
      displayName: this.state.currentDisplayName,
      finalBid: Number(this.state.currentBid),
      managerId: this.state.currentManagerId,
      playerId: this.state.currentPlayerId,
      team: this.state.currentPlayerTeam,
      position: this.state.currentPlayerPos
    };

    /* Updating Budget Here */
    const currentDrafted = this.state.draftedPlayers;
    const managers = this.state.managers;
    const managerIndex = managers.findIndex(
      m => m.managerId == this.state.currentManagerId
    );
    //console.log(this.state.currentManagerId);
    const manager = managers[managerIndex];
    //console.log('selected manager' + manager);
    //const updatedManager = update(managers[managerIndex], { budget: { $set: manager.budget - this.state.currentBid } });
    //const updatedManagers = update(managers, { $splice: [[managerIndex, 1, updatedManager]] });
    if (draftedPlayer.finalBid <= manager.maxBid) {
      //console.log('current drafted players: ' + JSON.stringify(currentDrafted));
      //this.state.draftedPlayers = updatedDrafted;
      this.setState({
        draftedPlayers: [...this.state.draftedPlayers, draftedPlayer],
        //managers: updatedManagers,
        currentDisplayName: "",
        currentBid: null,
        currentManagerId: 0,
        currentPlayerId: 0,
        currentPlayerTeam: "",
        currentPlayerPos: "",
        errorMessage:
          '<h3 style="color:green; text-align:center;">Player successfully drafted!</h1>'
      });
    } else {
      //console.log('not enough money');
      this.setState({
        errorMessage:
          '<h3 style="color:red; text-align:center;">Not enough money for this bid!</h1>'
      });
    }

    this._typeahead.getInstance().clear();
    this.priceField.value = "";

    //this.state.draftedPlayers.push(draftedPlayer)
    //this.setState({ draftedPlayers: [...previousDraftedPlayers, draftedPlayer]})
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleFocus = () => {
    this.priceField.value = "";
    this.setState({
      currentBid: null
    });
  };

  componentWillMount() {}

  componentDidMount() {
    this.managersRef = Base.syncState(`teamManagers`, {
      context: this,
      state: "managers",
      asArray: true
    });

    this.nflPlayersRefs = Base.syncState(`nflPlayers`, {
      context: this,
      state: "nflPlayers",
      asArray: true
    });

    this.draftedRefs = Base.syncState(`draftedPlayers`, {
      context: this,
      state: "draftedPlayers",
      asArray: true
    });

    Base.listenTo("draftedPlayers", {
      context: this,
      asArray: true,
      then(players) {
        // const managerIndex = managers.findIndex(m => m.managerId == this.state.currentManagerId);
        // console.log(this.state.currentManagerId);
        // const manager = managers[managerIndex];

        //console.log('player added');
        const managersArray = this.state.managers;
        const draftedPlayersArray = this.state.draftedPlayers;

        let updatedManagersArray = [];
        //console.log(JSON.stringify(managersArray));

        managersArray.map((manager, index) => {
          let updatedManager = manager;
          let specificDraftedPlayers = [];
          let totalPrice = 0;
          const managerID = manager.managerId;
          // console.log('current manager:' + JSON.stringify(manager) + ' manager id: ' + managerID);
          // console.log('length array: ' + draftedPlayersArray.length);
          if (players.length > 0 || players !== "undefined") {
            players.map((player, index) => {
              if (player.managerId == managerID) {
                totalPrice = Number(totalPrice) + Number(player.finalBid);
                specificDraftedPlayers.push(player);
              }
              return null;
            });
          }

          const totalTeamSize = Number(specificDraftedPlayers.length);
          let maxBid = 0;
          if (totalTeamSize == 16) {
            maxBid = 0;
          } else {
            maxBid = Number(200 - totalPrice - (15 - totalTeamSize));
          }

          // console.log('manager name: ' + manager.managerName);
          // console.log('Total price:' + totalPrice);
          // console.log('Total team size:' + totalTeamSize);
          // console.log('specific drafted players: ' + JSON.stringify(specificDraftedPlayers));
          // console.log('max bid:' + maxBid);

          updatedManager.draftedPlayers = specificDraftedPlayers;
          updatedManager.maxBid = maxBid;
          updatedManager.budget = 200 - totalPrice;
          //console.log('updated Manager: ' + JSON.stringify(updatedManager));
          updatedManagersArray.push(updatedManager);
          return null;
        });

        this.setState({
          managers: updatedManagersArray
        });
      }
    });
  }

  componentWillUnmount() {
    Base.removeBinding(this.nflPlayersRefs);
    Base.removeBinding(this.draftedRefs);
    //Base.removeBinding(this.managersRefs);
  }

  isEmpty = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  createError = () => {
    return { __html: this.state.errorMessage };
  };

  render() {
    const currentPlayers = this.state.nflPlayers;
    //console.log(this.state.drafted);
    return (
      <div className="manager manager-wrapper">
        <div className="inner-wrapper">
          <img
            src={ManagerIcon}
            alt="Draft Manager"
            className="center"
            width="140"
          />
          <h1>Draft Manager</h1>
          <div className="ui section divider"></div>
          <div className="add-player">
            <div className="ui form">
              <div dangerouslySetInnerHTML={this.createError()} />
              <form onSubmit={this.handleSubmit}>
                <div className="search">
                  <div className="search-players" style={{ width: "100%" }}>
                    <Typeahead
                      id="nflPlayers"
                      onChange={selected => {
                        const currentPlayer = selected[0];
                        if (!this.isEmpty(currentPlayer)) {
                          this.setState({
                            currentDisplayName: currentPlayer["displayName"],
                            currentPlayerId: currentPlayer["key"],
                            currentPlayerTeam: currentPlayer["team"],
                            currentPlayerPos: currentPlayer["position"],
                            errorMessage: ""
                          });
                        }

                        //console.log('selected value ' + JSON.stringify(selected) + currentP["fname"]);
                      }}
                      ref={ref => (this._typeahead = ref)}
                      options={currentPlayers}
                      labelKey="displayName"
                      placeholder="Search Players..."
                      renderMenuItemChildren={option => (
                        <div>
                          {option.displayName} -{" "}
                          <strong>
                            {option.position} ({option.team})
                          </strong>
                        </div>
                      )}
                    />
                  </div>
                </div>
                <div className="fields">
                  <div className="eleven wide field">
                    <label>Team Manager</label>
                    <select
                      value={this.state.currentManagerId}
                      name="currentManagerId"
                      onChange={this.handleChange}
                      className="custom-select"
                    >
                      <option value="0">Select Manager...</option>
                      <option value="1">Andrew Gillman</option>
                      <option value="2">Clayton Brady</option>
                      <option value="3">Cliff Braton</option>
                      <option value="4">Cord Overton</option>
                      <option value="5">Dan Swenson</option>
                      <option value="6">Jaclyn Overton</option>
                      <option value="7">John F Kennedy</option>
                      <option value="8">KJ Davaatseren</option>
                      <option value="9">Matt Smith</option>
                      <option value="10">Michelle Krestine</option>
                      <option value="11">Nate Adamson</option>
                      <option value="12">RJ Nay</option>
                      <option value="13">Roman Serebryakov</option>
                      <option value="14">Torrey Johnson</option>
                    </select>
                  </div>
                  <div className="five wide field">
                    <label>Winning Bid</label>
                    <div className="ui right labeled input">
                      <input
                        type="number"
                        name="currentBid"
                        onFocus={this.handleFocus}
                        value={this.state.currentBid}
                        onChange={this.handleChange}
                        ref={input => (this.priceField = input)}
                      />
                      <label className="ui label">$</label>
                    </div>
                  </div>
                </div>
                <button
                  className="fluid large ui green button"
                  type="submit"
                  onClick={this.handleSubmit}
                >
                  Submit Player
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
