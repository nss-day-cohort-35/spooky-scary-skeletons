import React, { Component } from 'react'
import ReactDOM from 'react-dom'
//import the components we will need
import ChatCard from './ChatCard'
import moment from "moment";
import APIManager from '../../modules/APIManager'
import { timeout } from 'q';
import './Chat.css'


class ClassList extends Component {

    state = {
        messages: [],
        newMessage: "",
        loadingStatus: false
    }

    handleFieldChange = event => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        console.log(stateToChange);
        this.setState(stateToChange);
    };

    constructNewMessage = (event) => {
        console.log("constructing");
        if (this.state.newMessage === "") {
            window.alert("Please input a message first.");
        } else {
            this.setState({ loadingStatus: true });
            const message = {
                userId: 5000,
                message: this.state.newMessage,
                date: moment().format("lll")
            };

            APIManager.post(message, "messages")
            .then(() =>{
                APIManager.getAllAndExpand("messages","user")
                .then((data) => {
                    console.log(data);
                    this.setState({ messages: data, loadingStatus:false, newMessage:""})
                    ReactDOM.findDOMNode(this.refs.form).value = "";
                })
            }
            )
        }
        }
    

    componentDidMount() {

        APIManager.getAllAndExpand("messages","user")
            .then((data) => {
                console.log(data);
                this.setState({ messages: data })
            })
    }

    render() {
        console.log(this.state.messages);
        return (
            <>
                <div className="container-cards">
                    {this.state.messages.map(message =>
                        <ChatCard key={message.id} message={message} {...this.props} />
                    )}
                </div>
                <div className = "container-input">
                    <input type = "text" className = "input-box" ref="form" id = "newMessage" 
                    onChange = {this.handleFieldChange} placeholder = "Add Message Here!"></input>
                    <button type = "button" className = "container-button" 
                    disabled={this.state.loadingStatus}
                    onClick={this.constructNewMessage}>Add Message</button>
                </div>
            </>
        )
    }
}
export default ClassList