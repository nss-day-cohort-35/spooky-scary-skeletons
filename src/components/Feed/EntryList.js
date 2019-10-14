import React, { Component } from 'react';
import API from '../../modules/APIManager'
import EntryCard from './EntryCard'
import './Feed.css'



class EntryList extends Component {
    state = {
        entries: []
    };
    // 1). On page load - search all the people you follow
    componentDidMount() {
        // logged in user
        let returnedStorage = localStorage.getItem('credentials')
        let currentUser = JSON.parse(returnedStorage)[0].id
        console.log("check it out", currentUser)
        this.getFollows(currentUser)
    }
    getFollows(currentUser) {
        console.log("get follows")
        API.getAndFilter("follows", "initiate", currentUser)
            .then(arrayOfFollows => this.getEntries(arrayOfFollows, currentUser))
    }
    // 2.) build up a fetch call that gets the articles or events of all the people you follow 
    getEntries(arrayOfFollows, currentUser) {
        let userIdString = ""
        arrayOfFollows.forEach(follow => { userIdString += `&userId=${follow.userId}` })
        API.getFeed(`${this.props.database}`, `${currentUser}`, `${userIdString}`)
            .then(response => this.setState({ entries: [...response].sort((a, b) => new Date(b.date) - new Date(a.date)) }))
    }
    // 3). return a card for each article or event of all the people you follow. pass content from entries State as props 
    render() {
        // delete an entry
        const deleteEntry = (id, database) => {
            const confirmDelete = window.confirm("Do you want to delete this?")
            if (confirmDelete) {
                API.delete(id, database)
                    .then(e => this.getFollows(JSON.parse(localStorage.getItem('credentials'))[0].id))
            }
        }
        return (
            <>
                <section className="section-content">
                    <button type="button" onClick={() => { this.props.history.push(`/${this.props.database}/new`) }}>Add</button>
                </section>
                <div className="container-entry-list">
                    {this.state.entries.map((entry, i) => <EntryCard key={i} cardContent={entry} deleteEntry={deleteEntry} {...this.props} />)}
                </div>
            </>
        )
    }
}

export default EntryList
