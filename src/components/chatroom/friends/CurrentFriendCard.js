import React, { Component } from 'react';
import { Link } from "react-router-dom";

class CurrentFriendCard extends Component {
    render() {
        console.log(this.props.friend)
        return (
            <div className="card">
                <div className="card-content">
                    <p className="card-name">{this.props.friend.user.name}</p>
                    <button type = "button" className = "card-button" onClick={() => this.props.removeFriend(this.props.friend.id)}>Remove</button>
                </div>
            </div>
        )
    }
}

export default CurrentFriendCard;