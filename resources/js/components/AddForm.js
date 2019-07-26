import React, {Component} from 'react'
import { MyContext } from './MyContext'
import axios from 'axios'

class AddForm extends Component
{

	constructor()
	{
		super();
		this.state = {};

		this.add_new_contact = this.add_new_contact.bind(this);
	}

	add_new_contact()
	{
		var reg_expr = /^\+\d{3}\s\d{3}\s\d{3}\s\d{2}\s\d{2}$/;
		var data = {
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
			alert('Invalid phone format. Try this: +xxx xxx xx xx');
			return ;
		}

		axios.post('/api/contacts/add', data).then(res => {

			axios.get('/api/contacts').then(res => {
				this.context.update_state(res.data);
				this.context.toggle_add_form();
				alert('Contact added');
			});

		}).catch(error => {
			alert('Error occured');
		});

	}

	render()
	{
		return(
			<div className="card px-4 pt-2">
				<form action="api/contacts/add" method="POST">
					<div className="form-group">
						<label htmlFor="name">Name</label>
						<input type="text" className="form-control" name="name" id="name" placeholder="" />
					</div>
					<hr/>
					<div className="form-group">
						<label htmlFor="phone">Phone</label>
						<input type="text" className="form-control" name="phone" id="phone" placeholder="+xxx xxx xxx xx xx" />
					</div>
					<hr/>
					<div className="form-group">
						<label htmlFor="info">Info</label>
						<textarea className="form-control" name="info" id="info" rows="3"></textarea>
					</div>
					<hr/>
					<div className="form-group">
						<label htmlFor="info">Image URL</label>
						<input type="text" className="form-control" name="img_url" id="img_url" />
					</div>
					<hr/>
					<div className="form-group">
						<button onClick={this.add_new_contact} type="button" className="btn btn-success">OK</button>
						<div className="d-flex float-right">
							<button onClick={this.context.toggle_add_form} type="button" className="btn btn-secondary">Cancle</button>
						</div>
					</div>

				</form>
			</div>
		);
	}
}

AddForm.contextType = MyContext;

export default AddForm