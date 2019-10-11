import React, { Component } from 'react'
import ReactDOM from 'react-dom'
//import the components we will need
import NewFriendCard from './NewFriendCard'
import CurrentFriendCard from './CurrentFriendCard'
import moment from "moment";
import APIManager from '../../../modules/APIManager'
import { timeout } from 'q';
import './Friends.css';

class FriendsList extends Component {
    state = {
        searchResults: [],
        searchBox: "",
        loading: false,
        currentUserId: 0
    }

    handleFieldChange = event => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        console.log(stateToChange);
        this.setState(stateToChange);
    };

    componentDidMount() {
        let returnedStorage = localStorage.getItem('credentials')
        let currentUser = JSON.parse(returnedStorage)[0]
        this.setState({ currentUserId: currentUser.id })
    }

    searchFriends = () => {
        if (this.state.searchBox === "") {
            window.alert("Please input a username first.");
        }
        else {
            this.setState({ loading: true })
            APIManager.searchDatabase("users", "username", this.state.searchBox)
                .then((data) => {
                    if (Object.keys(data).length === 0) {
                        window.alert("Couldn't find anyone! This rattles my bones!");
                    }
                    else {
                        this.setState({ searchResults: data })
                    }
                    this.setState({ loading: false })
                })
        }
    }

    render() {
        console.log(this.props.friends)

        return (
            <>
                <div className="friends-container">
                    <div className="search-container">
                        <input className="search-inbox" id="searchBox" ref="form" onChange={this.handleFieldChange}></input>
                        <button className="submit-button" disabled={this.loading} onClick={this.searchFriends}>Search</button>
                        <div className="search-friends">
                            {this.state.searchResults.map(user =>
                                <NewFriendCard key={user.id} user={user} {...this.props} />
                            )}
                        </div>
                    </div>
                    <div className="current-container">
                        {this.props.friends.map(friend =>
                            <CurrentFriendCard key={friend.id} friend={friend} deleteFriend={this.deleteFriend} {...this.props} />
                        )}
                    </div>
                </div>
            </>
        )
    }
}

export default FriendsList