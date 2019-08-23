import React, { Component } from 'react';
import ManagerIcon from '../assets/trainer.svg';
import DraftIcon from '../assets/write-board.svg';

export default class MainScreen extends Component {
  render() {
    return (
    <div className="splitlayout">
        <div className="intro">
            <div className="side side-left">
                <div className="intro-content">
                    <div className="profile"><a href="/manager"><img src={ManagerIcon} alt="Draft Manager" /></a></div>
                    <h1><a href="/manager"><span>Draft Manager</span><span>Add Players</span></a></h1>
                </div>
            </div>
            <div className="side side-right">
                <div className="intro-content">
                    <div className="profile"><a href="/draft-board"><img src={DraftIcon} alt="Draft Board" /></a></div>
                    <h1><a href="/draft-board"><span>Draft Board </span><span>View Rosters</span></a></h1>
                </div>
            </div>
        </div>
    </div>
    );
  }
}
