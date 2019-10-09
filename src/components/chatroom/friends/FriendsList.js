import React, { Component } from 'react'
import ReactDOM from 'react-dom'
//import the components we will need
import NewFriendCard from './NewFriendCard'
import CurrentFriendCard from './CurrentFriendCard'
import moment from "moment";
import APIManager from '../../../modules/APIManager'
import { timeout } from 'q';

class FriendsList extends Component {
    state = {
        friends: [],
        searchResults: [],
        searchBox: "",
        loading:false,
    }


    handleFieldChange = event => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        console.log(stateToChange);
        this.setState(stateToChange);
    };

    componentDidMount() {
        APIManager.getFriends("follows", "user", "initiate", 5000)
            .then((data) => {
                this.setState({ friends: data })
                console.log(data)
            })
    }

    searchFriends = () => {
        if (this.state.searchBox === "") {
            window.alert("Please input a username first.");
        }
        else{ 
        this.state.loading = true;
        APIManager.searchDatabase("users", "username", this.state.searchBox)
            .then((data) => {
                console.log("search data:", data)
                if(Object.keys(data).length === 0){
                    window.alert("Couldn't find anyone! This rattles my bones!");
                }
                else{
                this.setState({ searchResults: data })
                }
                this.state.loading = false;
            })
        }
    }

    addFriend = id => {

        APIManager.searchDatabase("follows","userId",id).then((data)=>{

            let matchFound = false;
            data.forEach(element => {
                if(element.initiate === 5000){
                    matchFound = true;
                }
            });
            if(matchFound === true){
                window.alert("You're already following this person, numbskull!");
            }
            else{
                const newFriend = {
                    initiate:5000,
                    userId:id
                }
                APIManager.post(newFriend, "follows")
                .then(() => {
                    APIManager.getFriends("follows", "user", "initiate", 5000)
                    .then((data) => {
                        this.setState({ friends: data })
                    })
                })
            }
        })
    }

    deleteFriend = id => {
        APIManager.delete(id, "follows")
            .then(() => {
                APIManager.getFriends("follows", "user", "initiate", 5000)
                    .then((newFriends) => {
                        this.setState({
                            friends: newFriends
                        })
                    })
            })
    }
    render() {

        return (
            <>
                <div className="friends-container">
                    <div className="search-container">
                        <input className="search-inbox" id="searchBox" ref="form" onChange={this.handleFieldChange}></input>
                        <button className="submit-button" disabled = {this.loading} onClick={this.searchFriends}>Search</button>
                        <div className = "search-friends">
                        {this.state.searchResults.map(user =>
                            <NewFriendCard key={user.id} user={user} addFriend={this.addFriend} {...this.props} />
                        )}
                        </div>
                    </div>
                    <div className="current-container">
                        {this.state.friends.map(friend =>
                            <CurrentFriendCard key={friend.id} friend={friend} removeFriend={this.deleteFriend} {...this.props} />
                        )}
                    </div>
                </div>
            </>
        )
    }
}

export default FriendsList