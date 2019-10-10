import React, { Component } from 'react'
import ReactDOM from 'react-dom'
//import the components we will need
import ChatEditCard from './ChatEditCard'
import FriendsList from './friends/FriendsList'
import moment from "moment";
import APIManager from '../../modules/APIManager'
import { timeout } from 'q';
import './Chat.css'


class ClassList extends Component {

    state = {
        messages: [],
        newMessage: "",
        loadingStatus: false,
        currentUserId: 0
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
                userId: this.state.currentUserId,
                message: this.state.newMessage,
                date: moment().format("lll")
            };

            APIManager.post(message, "messages")
            .then(() =>{
                APIManager.getAllAndExpand("messages","user")
                .then((data) => {
                    this.setState({ messages: data, loadingStatus:false, newMessage:""})
                    ReactDOM.findDOMNode(this.refs.form).value = "";
                })
            }
            )
        }
        }

    componentDidMount() {
        let returnedStorage = localStorage.getItem('credentials')
        let currentUser = JSON.parse(returnedStorage)[0]
        this.setState({currentUserId:currentUser.id})

        APIManager.getAllAndExpand("messages","user")
            .then((data) => {
                this.setState({ messages: data })
            })
    }

    render() {
        return (
            <>
                <div className="container-cards">
                    {this.state.messages.map(message =>
                        <ChatEditCard key={message.id} message={message} currentUserId={this.state.currentUserId}{...this.props}/>
                    )}
                </div>
                <div className = "container-input">
                    <input type = "text" className = "input-box" ref="form" id = "newMessage" 
                    onChange = {this.handleFieldChange} placeholder = "Add Message Here!"></input>
                    <button type = "button" className = "container-button" 
                    disabled={this.state.loadingStatus}
                    onClick={this.constructNewMessage}>Add Message</button>
                </div>
                <FriendsList/>
            </>
        )
    }
}
export default ClassList