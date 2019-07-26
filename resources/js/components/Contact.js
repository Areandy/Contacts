import React, { Component } from 'react';
import { MyContext } from './MyContext'
import EditForm from './EditForm'
import axios from 'axios'

class Contact extends Component
{

	constructor(props)
	{
		super(props);
		this.state = {
			edit_form_flag: false,
			toggle_edit_form: () => {
				this.setState({
					edit_form_flag: !this.state.edit_form_flag
				});
			},
			context: {}
		};

		this.delete_cnotact = this.delete_cnotact.bind(this);
	}

	componentDidMount()
	{
		this.setState({
			context: this.context
		});
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
		var contact = this.props.contact;

		if (this.state.edit_form_flag)
			return (
				<EditForm 
					edit_form_flag={this.state.edit_form_flag}
					toggle_edit_form={this.state.toggle_edit_form}
					contact={this.props.contact}
				/>
			);
		else
			return (
				<div className='card mt-3 pt-3'>
					<div className="container-fluid">
						<div className="row">
							<div className="col-3">
								<img 
									src={
										(contact.img_url !== '')
											? contact.img_url
											: "https://via.placeholder.com/150"
									}
									style={{border: '2px solid black', borderRadius: "200px", width: "100px", height: "100px"}}
								/>
							</div>
							<div className="col-5">
								<div className='card-body'>
									<h5 className='card-title'>{contact.name}</h5>
									<p>{contact.phone}</p>
								</div>
							</div>
							<div className="col-4 mt-3">
								<div className="d-flex justify-content-between">
									<div onClick={this.state.toggle_edit_form} className="alert alert-primary">Edit</div>
									<div onClick={this.delete_cnotact} className="alert alert-danger">X</div>
								</div>
							</div>
						</div>
						<div className="row pb-2">
							<div className="col-4"></div>
							<div className="col-6 d-flex justify-content-between">
								{(contact.info === '') ? 'Some additional info' : contact.info}
							</div>
							<div className="col-4"></div>
						</div>
					</div>
				</div>
			);
	}
}

Contact.contextType = MyContext;

export default Contact