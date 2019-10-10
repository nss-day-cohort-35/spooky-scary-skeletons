import React, { Component } from 'react';
import { Link } from "react-router-dom";

class NewFriendCard extends Component {
    render() {
        console.log(this.props.friend)
        return (
            <div className="card">
                <div className="card-content">
                    <p className="card-name">{this.props.user.username}</p>
                    <button type = "button" className = "card-button" onClick={() => this.props.addFriend(this.props.user.id)}>Add</button>
                </div>
            </div>
        )
    }
}

export default NewFriendCard;