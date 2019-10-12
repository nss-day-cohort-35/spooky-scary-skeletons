import React, { Component } from 'react';
import { Link } from "react-router-dom";
import APIManager from '../../modules/APIManager'

class ChatEditCard extends Component {


    IsEditAvailable = () => {
        let body;
        console.log(this.props.message.user.id, "=", this.props.currentUserId)
        if (this.props.message.user.id === this.props.currentUserId) {
            body = <>
                <div className="card-content">
                    <p className="chat-card-name">{this.props.message.user.username}</p>
                    <p className="chat-card-message">{this.props.message.message}</p>
                    <p className="chat-date">{this.props.message.date}</p>
                    <button
                   onClick={() => {this.props.history.push(`/chat/${this.props.message.id}/edit`)}}>Edit
                   </button>
                </div>
            </>

        }
        else {
            body = <>
                <div className="card-content">
                <p className="chat-card-name" onClick = {()=>this.props.addFriend(this.props.message.user.id)}>{this.props.message.user.username}</p>
                    <p className="card-message">{this.props.message.message}</p>
                    <p className="chat-date">{this.props.message.date}</p>
                </div>
            </>
        }
        return body
    }



    render() {
        return (
            <div className="card">
                <this.IsEditAvailable />
            </div>
        )
    }
}

export default ChatEditCard;