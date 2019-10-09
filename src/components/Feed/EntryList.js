import React, { Component } from 'react';
import API from '../../modules/APIManager'
import EntryCard from './EntryCard'

// logged in user
let currentUser = "1"

class EntryList extends Component {
    state = {
        entries: []
    };

    // triggered by componentDidMount - fetches the entries of each user you follow and sets state with that array of entries 
    getEntries(arrayOfFollows) {
        let userIdString = ""
        arrayOfFollows.forEach(follow => { userIdString += `&userId=${follow.userId}` })
        // this.props.database determines whether those entries will be news or events
        API.getFeed(`${this.props.database}`, `${currentUser}`, `${userIdString}`).then(response => this.setState({ entries: [...response] }))
    }

    // start here on componentDidmount
    componentDidMount() {
        API.getAndFilter("follows", "initiate", currentUser)
            .then(arrayOfFollows => this.getEntries(arrayOfFollows))
    }

    render() {
        return (
            <>
            <section className="section-content">
                <button type="button" className="btn" onClick={() => { this.props.history.push(`/${this.props.database}/new`) }}>Add</button>
            </section>
            <div className="container-cards">
                {this.state.entries.map((entry, i) => <EntryCard key={i} cardContent={entry} {...this.props} />)}
            </div>
            </>
        )
    }
}

export default EntryList
