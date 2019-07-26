import React, {Component} from 'react'
import { MyContext } from './MyContext'
import axios from 'axios'

class EditForm extends Component
{

	constructor()
	{
		super();
		this.state = {};

		this.update_contact = this.update_contact.bind(this);
	}


	update_contact()
	{
		var reg_expr = /^\+\d{3}\s\d{3}\s\d{3}\s\d{2}\s\d{2}$/;
		var data = {
			id: this.props.contact.id,
			name: $('#name').val(),
			phone: $('#phone').val(),
			info: $('#info').val(),
			img_url: $('#img_url').val()
		};

		if (!data.name || !data.phone) {
			alert('You need to fill Name and Phone number');
			return ;
		}

		if (!(data.phone.match(reg_expr))) {
			alert('Invalid phone format. Try this: +xxx xxx xxx xx xx');
			return ;
		}

		axios.post('/api/contacts/update', data).then(res => {

			axios.get('/api/contacts').then(res => {
				this.context.update_state(res.data);
				this.props.toggle_edit_form();
				alert('Contact updated');
			});

		}).catch(error => {
			alert('Error occured');
		});

	}

	render()
	{
		const contact = this.props.contact;

		return(
			<div className="card px-4 pt-2 mt-3 mb-3">
				<div className="card-title">Edit form:</div>
				<form action="api/contacts/add" method="POST">
					<div className="form-group">
						<label htmlFor="name">Name</label>
						<input type="text" className="form-control" name="name" id="name" defaultValue={this.props.contact.name} />
					</div>
					<hr/>
					<div className="form-group">
						<label htmlFor="phone">Phone</label>
						<input type="text" className="form-control" name="phone" id="phone" defaultValue={this.props.contact.phone} placeholder="+xxx xxx xxx xx xx" />
					</div>
					<hr/>
					<div className="form-group">
						<label htmlFor="info">Info</label>
						<textarea className="form-control" name="info" id="info" rows="3" defaultValue={this.props.contact.info}></textarea>
					</div>
					<hr/>
					<div className="form-group">
						<label htmlFor="info">Image URL</label>
						<input type="text" className="form-control" name="img_url" id="img_url" defaultValue={this.props.contact.img_url} />
					</div>
					<hr/>
					<div className="form-group">
						<button onClick={this.update_contact} type="button" className="btn btn-success">Update</button>
						<div className="d-flex float-right">
							<button onClick={this.props.toggle_edit_form} type="button" className="btn btn-secondary">Cancle</button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

EditForm.contextType = MyContext;

export default EditForm