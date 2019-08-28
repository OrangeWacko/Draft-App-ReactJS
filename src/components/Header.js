import React, { Component } from 'react';
import {app} from './Base';
import { NavLink, Redirect } from 'react-router-dom';
import HouseIcon from '../assets/home.svg';
import { Menu, MenuItem, Button, ButtonGroup, AnchorButton, IconName, Popover, Position } from "@blueprintjs/core";

export default class DraftBoard extends Component {

    state = {
      redirect: false,
    }

    logOut = () => {
      //console.log('clicking');

      app.auth().signOut()
      this.setState ({
        redirect: true
      })
    }


    renderRedirect = () => {
      if (this.state.redirect) {
        return <Redirect to='/' />
      }
    }

    render() {
      const managerMenu = (
        <Menu>
            <MenuItem text="Auction Manager" href="/manager"/>
            <MenuItem text="Manage Teams" href="/manage-teams"/>
        </Menu>
      );

      const viewMenu = (
        <Menu>
            <MenuItem text="Draft Board" href="/draft-board"/>
            <MenuItem text="Drafted Players" href="/drafted-players"/>
        </Menu>
      );
      return (
        <div className="draft-nav ui secondary tiny menu">
          {this.renderRedirect()}
          <div className="left menu">
            <NavLink exact activeClassName='active' to='/' className="home-icon"><img src={HouseIcon} alt="Draft Manager" className="center" width="22"/></NavLink>
          </div>
          <div className="right menu">
            <ButtonGroup minimal={false} fill={true} style={{ minWidth: 120 }}>
              <Popover content={managerMenu} position={Position.BOTTOM}>
                <AnchorButton icon="clipboard" rightIcon="caret-down">Manage</AnchorButton>
              </Popover>
              <Popover content={viewMenu} position={Position.BOTTOM}>
                <AnchorButton icon="eye-open" rightIcon="caret-down">View</AnchorButton>
              </Popover>
            </ButtonGroup>
            <button className="item logout" onClick={this.logOut} >Log Out</button>
          </div>
        </div>
      );
    }
}
