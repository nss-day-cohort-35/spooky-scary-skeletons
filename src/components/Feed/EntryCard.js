import React, { Component } from 'react';
import './Feed.css'


class EntryCard extends Component {
    render() {
        // logged in user
        let returnedStorage = localStorage.getItem('credentials')
        let currentUser = JSON.parse(returnedStorage)[0].id
        let editButton;
        let deleteButton;

        // populate edit and delete buttons if userId = currentUser
        if (Number(this.props.cardContent.userId) === currentUser) {
            editButton = <button type="button" onClick={() => { this.props.history.push(`/${this.props.database}/${this.props.cardContent.id}/edit`) }}>Edit</button>
            deleteButton = <button type="button" onClick={(event) => this.props.deleteEntry(`${this.props.cardContent.id}`, `${this.props.database}`)} disabled={false}>Delete</button>
        }
        // return single entry
        return (
            <div className="entry-card">

                <p className="card-user-name">{`${this.props.cardContent.user.name}`}</p>
                <p className="card-date">{`${this.props.cardContent.date}`}</p>
                <p className="normal-text">{`${this.props.cardContent.message}`}</p>
                <img className="entry-img" src={`${this.props.cardContent.image}`} alt=""></img>
                <h5>{this.props.cardContent.title}</h5>
                <p className="normal-text">{this.props.cardContent.description}</p>
                <a className="card-link" href={`${this.props.cardContent.url}`} alt="">{`${this.props.cardContent.url}`}</a>
                <div>{editButton}{deleteButton}</div>

            </div>
        )
    }
}

export default EntryCard;