import React, { Component } from 'react';
import {Base} from './Base';


export default class TeamsManager extends Component {
	state = {

	}

	render() {
		return (
			<div className="manager manager-wrapper">
				<div className="inner-wrapper">
					<h1>Add Team</h1>
					<div className="ui section divider"></div>
					<div className="add-team">
						<div className="ui form">

							<form onSubmit={this.handleSubmit}>
								<div className="fields">
									<div className="eleven wide field">
										<label>Team name</label>
										<input type="text" placeholder="Name" name="Name" />
									</div>
									<div className="five wide field">
										<label>Team Budget</label>
										<div className="ui right labeled input">
											<input type="number" placeholder="0" />
										 	<label className="ui label">$</label>
										</div>
									</div>
								</div>
								<button className="fluid large ui green button" type="submit" >Add Team</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
  }
}
