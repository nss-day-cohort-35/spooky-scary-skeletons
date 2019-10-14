import React, {Component} from 'react';
import APIManager from '../../modules/APIManager';
import {Table} from 'reactstrap'



class Chat extends Component {
    state = {
        messages: [],
    };

    getData = () => {
        APIManager.getAllAndExpand("messages", "user")
            .then((data) => {
                
                this.setState({ messages: data })
               
            })
    }


    componentDidMount(){
         this.getData()
    }

    
    render() {
        console.log('CHAT: Render');
        return(
            <>
            <div class="list-group">
            {this.state.messages.map(message => (
                    <a class="list-group-item list-group-item-action">
                    <div class="d-flex w-100 justify-content-between">
                    <small class="mb-1">{message.user.username} -</small>
                    <small>{message.date}</small>
                    </div>
                    <p class="mb-1">{message.message}</p>
                </a>
                 
                ))}
            </div>
            </>
        )
    }
}

export default Chat;