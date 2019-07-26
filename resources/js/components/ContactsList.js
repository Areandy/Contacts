import React, { Component, useContext } from 'react';
import Contact from './Contact'
import AddForm from './AddForm';
import { MyContext } from './MyContext'

class ContactsList extends Component
{

	constructor()
	{
		super();
		this.state = {
			contacts: [],
			add_form_flag: false
		};

		this.updateContacts = this.updateContacts.bind(this);
		this.openAddForm = this.openAddForm.bind(this);
	}

	componentWillUpdate()
	{
		if (this.state.contacts !== this.context)
			this.setState({
				contacts: this.context
			});
	}

	updateContacts()
	{
		this.setState({
			contacts: this.context.contacts
		});

	}

	openAddForm()
	{
		this.setState({
			add_form_flag: this.context
		});
	}

	render()
	{
		var contatcs_load_flag = false;
		return (
			<div>
				<div className="row mt-4">
					<div className="col-5">
						<h2>Contacts List:</h2>
					</div>
					<div className="col-7">
						<div className="d-flex float-right">
							{
								(this.context.add_form_flag == false)
									? <div onClick={this.context.toggle_add_form} className="alert alert-success">Add new</div>
									: <div></div>
							}
						</div>
					</div>
				</div>
				{
					(this.context.add_form_flag)
						? <AddForm />
						: <div></div>
				}
				{(typeof this.context.contacts !== 'undefined') ? this.context.contacts.map( contact => (
					<Contact contact={contact} key={contact.id} />
				)) : 'Loading...'}
			</div>
		);
	}
}

ContactsList.contextType = MyContext;



export default ContactsList;