import React, { Component } from 'react';
import { Link } from "react-router-dom";

class ChatEditCard extends Component {

    IsEditAvailable = () => {
        let body;
        console.log(this.props.message.user.id, "=", this.props.currentUserId)
        if (this.props.message.user.id === this.props.currentUserId) {
            body = <>
                <div className="card-content">
                    <p className="card-name">{this.props.message.user.username} :: {this.props.message.date} :</p>
                    <p className="card-message">{this.props.message.message}</p>
                    <button
                   onClick={() => {this.props.history.push(`/${this.props.message.id}/edit`)}}>Edit
                   </button>
                </div>
            </>

        }
        else {
            body = <>
                <div className="card-content">
                    <p className="card-name">{this.props.message.user.username} :: {this.props.message.date} :</p>
                    <p className="card-message">{this.props.message.message}</p>
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