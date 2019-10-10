import React, { Component } from 'react';
import { Link } from "react-router-dom";

class ChatCard extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-content">
                    <p className="card-name">{this.props.message.user.name} :: {this.props.message.date} :</p>
                    <p className="card-message">{this.props.message.message}</p>
                    <button type = "button" className = "card-button">Edit</button>

                </div>
            </div>
        )
    }
}

export default ChatCard;