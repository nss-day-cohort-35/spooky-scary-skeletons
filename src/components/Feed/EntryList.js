import React, { Component } from 'react';
import API from '../../modules/APIManager'
import EntryCard from './EntryCard'

// logged in user
let currentUser = "1"
class EntryList extends Component {
    state = {
        entries: []
    };
    // 2.) build up a fetch call that gets the articles or events of all the people you follow 
    getEntries(arrayOfFollows) {
        let userIdString = ""
        arrayOfFollows.forEach(follow => { userIdString += `&userId=${follow.userId}` })
        API.getFeed(`${this.props.database}`, `${currentUser}`, `${userIdString}`).then(response => this.setState({ entries: [...response] }))
    }
    // 1). On page load - search all the people you follow
    componentDidMount() {
        API.getAndFilter("follows", "initiate", currentUser)
            .then(arrayOfFollows => this.getEntries(arrayOfFollows))
    }
    // 3). return a card for each article or event of all the people you follow. pass content as props
    render() {
        return (
            <>
            <section className="section-content">
                <button type="button" onClick={() => { this.props.history.push(`/${this.props.database}/new`) }}>Add</button>
            </section>
            <div className="container-cards">
                {this.state.entries.map((entry, i) => <EntryCard key={i} cardContent={entry} {...this.props} />)}
            </div>
            </>
        )
    }
}

export default EntryList
