import React, { Component } from 'react'
import ReactDOM from 'react-dom'
//import the components we will need
import ChatEditCard from './ChatEditCard'
import FriendsList from './friends/FriendsList'
import moment from "moment";
import APIManager from '../../modules/APIManager'
import { timeout } from 'q';
import './Chat.css'


class ClassList extends Component {

    state = {
        friends: [],
        messages: [],
        newMessage: "",
        loadingStatus: false,
        currentUserId: 0
    }

    handleFieldChange = event => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        console.log(stateToChange);
        this.setState(stateToChange);
    };

    //Friends stuff
    getFriends() {
        APIManager.getFriends("follows", "user", "initiate", this.state.currentUserId)
            .then((data) => {
                this.setState({ friends: data })
            })
    }

    addFriend = id => {
        APIManager.searchDatabase("follows", "userId", id)
            .then((data) => {
                let matchFound = false;
                data.forEach(element => {
                    if (element.initiate === this.state.currentUserId) {
                        matchFound = true;
                    }
                });
                if (matchFound === true) {
                    window.alert("You're already following this person, numbskull!");
                }
                else {
                    const newFriend = {
                        initiate: this.state.currentUserId,
                        userId: id
                    }
                    APIManager.post(newFriend, "follows")
                        .then(() => {
                            APIManager.getFriends("follows", "user", "initiate", this.state.currentUserId)
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
                APIManager.getFriends("follows", "user", "initiate", this.state.currentUserId)
                    .then((newFriends) => {
                        this.setState({
                            friends: newFriends
                        })
                    })
            })
    }

    constructNewMessage = (event) => {
        console.log("constructing");
        if (this.state.newMessage === "") {
            window.alert("Please input a message first.");
        } else {
            this.setState({ loadingStatus: true });
            const message = {
                userId: this.state.currentUserId,
                message: this.state.newMessage,
                date: moment().format("lll")
            };

            APIManager.post(message, "messages")
                .then(() => {
                    APIManager.getAllAndExpand("messages", "user")
                        .then((data) => {
                            this.setState({ messages: data, loadingStatus: false, newMessage: "" })
                            ReactDOM.findDOMNode(this.refs.form).value = "";
                            this.scrollToBottom()
                        })
                }
                )
        }
    }

    componentDidMount() {
        let returnedStorage = localStorage.getItem('credentials')
        let currentUser = JSON.parse(returnedStorage)[0]
        this.setState({ currentUserId: currentUser.id })

        APIManager.getAllAndExpand("messages", "user")
            .then((data) => {
                this.setState({ messages: data })
                APIManager.getFriends("follows", "user", "initiate", this.state.currentUserId)
                    .then((data) => {
                        this.setState({ friends: data })
                    })
            })
    }


    scrollToBottom = () => {
        this.refs.chatOutput.scrollIntoView({ behavior: "smooth" });
    }

    performUpdate = (event) => {
        this.constructNewMessage(event)
    }

    render() {
        return (
            <>
            <article className = "chat-body">
                <h1 className="header">Chat and Friends</h1>
                <img className="image" src={require('../../images/skeletons-dancing.gif')} />
                <div className="container">
                    <div className="container-chat">
                        <div className="container-cards">
                            {this.state.messages.map(message =>
                                <ChatEditCard key={message.id} message={message} addFriend={this.addFriend} currentUserId={this.state.currentUserId}{...this.props} />
                            )}
                            <div ref="chatOutput">
                            </div>

                        </div>
                        <div className="container-input">
                            <input type="text" className="input-box" ref="form" id="newMessage"
                                onChange={this.handleFieldChange} placeholder="Add Message Here!"></input>
                            <button type="button" className="container-button"
                                disabled={this.state.loadingStatus}
                                onClick={this.performUpdate}>Add Message</button>
                        </div>
                    </div>
                    <div className="container-friends">
                        <FriendsList friends={this.state.friends} getFriends={this.getFriends} addFriend={this.addFriend} deleteFriend={this.deleteFriend} />
                    </div>
                </div>
                </article>
            </>
        )
    }
}
export default ClassList