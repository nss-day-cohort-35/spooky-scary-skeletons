import React, { Component } from 'react'
//import the components we will need
import ChatCard from './ChatCard'
import APIManager from '../../modules/APIManager'
import { timeout } from 'q';

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

    constructNewMessage() {
        console.log(stateToChange);
        if (this.state.newMessage === "") {
            window.alert("Please input a message first.");
        } else {
            this.setState({ loadingStatus: true });
            const message = {
                userId: 5000,
                message: this.state.newMessage,
                date: Date.now()
            };

            APIManager.post(message, "messages")
            .then(() =>{
                this.props.history.push("/")
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
                    <input type = "text" className = "input-box" id = "newMessage" 
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