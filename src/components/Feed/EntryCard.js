import React, { Component } from 'react';

// logged in user
let currentUser = "1"

class EntryCard extends Component {
    render() {
        let userName = <p className="card-user-name">{`${this.props.cardContent.user.name}`}</p>
        let cardDate = <p className="card-date">{`${this.props.cardContent.date}`}</p>
        let cardBody;
        let editButton;
        let deleteButton;
        // set the card body as article or event
        if (`${this.props.database}` === 'articles') {
            cardBody = <></>
        }
        else if (`${this.props.database}` === 'events') {
            cardBody = <></>
        }
        // populate edit/delete buttons
        if (`${this.props.cardContent.userId}` === currentUser) {
            editButton = <button type="button" onClick={() => {this.props.history.push(`/${this.props.database}/${this.props.cardContent.id}/edit`)}}>Edit</button>
            deleteButton = <button type="button" disabled={false}>Delete</button> 
        }
        return (
            <>
                {userName}
                {cardDate}
                {cardBody}
                {editButton}
                {deleteButton}
            </>
        )
    }
}

export default EntryCard;