import React, { Component } from 'react';
import { MyContext } from './MyContext'
import axios from 'axios'

class Contact extends Component
{

	constructor(props)
	{
		super(props);
		this.state = {};

		this.delete_cnotact = this.delete_cnotact.bind(this);
	}

	componentDidMount()
	{
		this.setState(this.context);
	}

	delete_cnotact()
	{
		if (confirm('Delete ' + this.props.contact.name + ' contact?'))
			axios.post('/api/contacts/delete', {id: this.props.contact.id}).then(res => {

				axios.get('/api/contacts').then(res => {
					this.context.update_state(res.data);
				});
			});
	}

	render()
	{
		const contact = this.props.contact;
		return (
			<div className='card mt-3'>
				<div className="container-fluid">
					<div className="row">
						<div className="col-2">
							<img src="" alt="" placeholder="sas"/>
						</div>
						<div className="col-6">
							<div className='card-body'>
								<h5 className='card-title'>{contact.name}</h5>
								<p>{contact.phone}</p>
							</div>
						</div>
						<div className="col-4 mt-3">
							<div className="d-flex justify-content-between">
								<div className="alert alert-primary">Edit</div>
								<div onClick={this.delete_cnotact} className="alert alert-danger">X</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-4"></div>
						<div className="col-6 d-flex justify-content-between">
							{(contact.info === '') ? 'Some additional info' : contact.info}
						</div>
						<div className="col-4"></div>
					</div>
				</div>
			</div>
			// <p>{this.state.id}: {this.state.contact.name}, Age:{this.state.contact.age}</p>
		);
	}
}

Contact.contextType = MyContext;

export default Contact