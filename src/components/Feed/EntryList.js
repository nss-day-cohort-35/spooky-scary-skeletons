import React, { Component } from 'react';
import API from '../../modules/APIManager'
import EntryCard from './EntryCard'

// logged in user
let currentUser = "1"
class EntryList extends Component {
    state = {
        entries: []
    };
    // 1). On page load - search all the people you follow
    componentDidMount() {
        this.getFollows()
    }
    getFollows() {
        API.getAndFilter("follows", "initiate", currentUser)
            .then(arrayOfFollows => this.getEntries(arrayOfFollows))
    }
    // 2.) build up a fetch call that gets the articles or events of all the people you follow 
    getEntries(arrayOfFollows) {
        let userIdString = ""
        arrayOfFollows.forEach(follow => { userIdString += `&userId=${follow.userId}` })
        API.getFeed(`${this.props.database}`, `${currentUser}`, `${userIdString}`)
            .then(response => this.setState({ entries: [...response].sort((a,b)=> new Date(b.date) - new Date(a.date))}))
    }
    // 3). return a card for each article or event of all the people you follow. pass content from entries State as props 
    render() {
        // delete an entry
        const deleteEntry = (id, database) => {
            const confirmDelete = window.confirm("Do you want to delete this?")
            if (confirmDelete) {
                API.delete(id, database)
                    .then(e => this.getFollows())
            }
        }
        return (
            <>
                <section className="section-content">
                    <button type="button" onClick={() => { this.props.history.push(`/${this.props.database}/new`) }}>Add</button>
                </section>
                <div className="container-cards">
                    {this.state.entries.map((entry, i) => <EntryCard key={i} cardContent={entry} deleteEntry={deleteEntry} {...this.props} />)}
                </div>
            </>
        )
    }
}

export default EntryList
