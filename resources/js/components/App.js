import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import ContactsList from './ContactsList'
import MyProvider from './MyContext'


// const arr = [
//     {
//         name: 'Max',
//         age: 12
//     },
//     {
//         name: 'John',
//         age: 41
//     },
//     {
//         name: 'Ferik',
//         age: 22
//     }
// ]

export default class App extends Component {    

    render() {
        return (
            <MyProvider>
                <div className="container">
                    <div className="row">
                        <div className="col-3"></div>
                        <div className="col-6">
                            <ContactsList />
                        </div>
                        <div className="col-3"></div>

                    </div>
                </div>
            </MyProvider>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
