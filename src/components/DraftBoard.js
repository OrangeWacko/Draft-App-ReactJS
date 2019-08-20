import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default class DraftBoard extends Component {
    state = {
        managers: []
    }


    render() {
        const Managers  = this.props.managers;
        //console.log(JSON.stringify(Managers))
        return (
            <div className="draft-board board-wrapper">
                <div className="ui stackable four column grid board-wrapper">
                {Managers.map((manager) => {
                    const drafted = manager.draftedPlayers;
                    let totalTeamSize = 0;
                    //console.log('current drafted players from draft board:' + JSON.stringify(totalTeamSize));
                    if (typeof(drafted) !== 'undefined' || drafted != null) {
                        totalTeamSize = drafted.length;
                    } else {

                    }
                    return(
                    <div className="column " key={manager.managerId}>
                        <Link to={`team/${manager.managerId}`}>
                        <div className="grid-item single-team-card">
                            <div className="single-team-inner ui grid">
                            <div className="current-roster ten wide column"><span>{totalTeamSize}/16</span></div>
                                <div className="manager-name ten wide column">{manager.managerName}</div>
                                <div className="money-info six wide column">
                                    <div className="budget">
                                        <h3>Budget:</h3>
                                        <h4><sup>$</sup>{manager.budget}</h4>
                                    </div>
                                    <div className="bid">
                                        <h3>Max Bix:</h3>
                                        <h4><sup>$</sup>{manager.maxBid}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </Link>
                    </div>
                    );
                })}
                </div>
            </div>
        );
    }
}
