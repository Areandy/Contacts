import React, {Component, createContext, useState} from 'react'
import axios from 'axios';

export const MyContext = createContext();

// export const MyProvider = MyContext.Provider;
// export const MyConsumer = MyContext.Consumer;
// export default MyContext;

// export const MyProvider = props => {
// 	const [contacts, setContacts] = useState([
// 		{
// 			name: 'max'
// 		},
// 		{
// 			name: 'john'
// 		}
// 	]);
// 	// setContacts([{name: 'sas'}]);

// 	let s = 12;
// 	// axios.get('/api/contacts').then(res => {
// 	// 	setContacts(res.data);
// 	// });

// 	console.log(contacts);
// 	return (
// 		<MyContext.Provider value={[contacts]}>
// 			{props.children}
// 		</MyContext.Provider>
// 	);
// };


class MyProvider extends Component
{

	constructor(props)
	{
		super(props);
		this.state = {
			contacts: [],
			add_form_flag: false,
			toggle_add_form: () => {
				this.setState({
					add_form_flag: !this.state.add_form_flag
				})
			},
			update_state: (data) => {
				this.setState({
					contacts: data
				});
				this.forceUpdate();
			}
		};
	}

	componentDidMount()
	{
		axios.get('/api/contacts').then(res => {
			this.setState({
				contacts: res.data
			});
		});
	}

	render() {
		return(
		<MyContext.Provider value={this.state}>
			{this.props.children}
		</MyContext.Provider>
		);
	}
}

export default MyProvider;