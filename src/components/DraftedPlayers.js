import React, { Component } from 'react';
import {Base} from './Base';

export default class DraftBoard extends Component {
    state = {
        draftedPlayers: []
    }

    componentDidMount() {

    this.draftedRefs = Base.syncState(`draftedPlayers`, {
        context: this,
        state: 'draftedPlayers',
        asArray: true
      });
    }


    render() {
        const DraftedPlayers  = this.state.draftedPlayers;
        //console.log(JSON.stringify(DraftedPlayers))
        return (
            <div className="drafted-players">
                <div className="ui stackable four column grid board-wrapper">
                { DraftedPlayers.map((player) => {

                    return(
                    <div className="column single-player" key={player.key}>
                      <div className="ui grid">
                        <div className="player-name thirteen wide column">
                        <p>{player.displayName} <span>{player.position} ({player.team})</span></p></div>
                        <div className="player-pos three wide column">
                        <p className="position"><b>${player.finalBid}</b></p>
                        </div>
                      </div>
                    </div>
                    );
                })
              }
                </div>
            </div>
        );
    }
}
