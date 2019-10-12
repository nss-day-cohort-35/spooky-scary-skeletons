import React, { Component } from 'react';
import { Link } from "react-router-dom";

class CurrentFriendCard extends Component {
    render() {
        console.log(this.props.friend)
        return (
            <div className="current-friend-card">
                <img className="icon-image" src={require('../../../images/skullicon.png')} />
                <div className="current-card-content">
                    <p className="current-card-name">{this.props.friend.user.name}</p>
                    <button type = "button" className = "card-button" onClick={() => this.props.deleteFriend(this.props.friend.id)}>Remove</button>
                </div>
            </div>
        )
    }
}

export default CurrentFriendCard;