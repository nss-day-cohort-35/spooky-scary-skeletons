import React, { Component } from 'react';
import API from '../../modules/APIManager';

// logged in user
let currentUser
if (localStorage) {currentUser = JSON.parse(localStorage.getItem('credentials'))[0]}
class EntryCard extends Component {
    render() {
        let editButton;
        let deleteButton;
        // populate edit and delete buttons if userId = currentUser
        if (`${this.props.cardContent.userId}` === currentUser) {
            editButton = <button type="button" onClick={() => {this.props.history.push(`/${this.props.database}/${this.props.cardContent.id}/edit`)}}>Edit</button>
            deleteButton = <button type="button" onClick={(event) => this.props.deleteEntry(`${this.props.cardContent.id}`, `${this.props.database}`)} disabled={false}>Delete</button> 
        }
        // return single entry
        return (
            <div>
                <p className="card-user-name">{`${this.props.cardContent.user.name}`}</p>
                <p className="card-date">{`${this.props.cardContent.date}`}</p>
                <p>{`${this.props.cardContent.message}`}</p>
                <img className="entry-img" src={`${this.props.cardContent.image}`} alt=""></img>
                <h5>{this.props.cardContent.title}</h5>
                <p>{this.props.cardContent.description}</p>
                <a href={`${this.props.cardContent.url}`} alt="">{`${this.props.cardContent.url}`}</a>
                {editButton}{deleteButton}
            </div>
        )
    }
}

export default EntryCard;