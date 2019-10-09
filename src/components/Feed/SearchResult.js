import React, { Component } from 'react';

// logged in user
let currentUser = "1"

class SearchResult extends Component {
    render() {
        let cardBody;
        // set the card body as article or event
        if (`${this.props.database}` === 'articles') {
            cardBody = <>
            <img src={`${this.props.content.urlToImage}`} alt=""></img>
            <h5>{this.props.content.title}</h5>
            <p>{this.props.content.description}</p>
            <a href={`${this.props.content.url}`} alt="">{`${this.props.content.url}`}</a>
            </>
        }
        else if (`${this.props.database}` === 'events') {
            cardBody = <>
            <img src={`${this.props.content.logo.url}`} alt=""></img>
            <h5>{this.props.content.name.text}</h5>
            <p>{this.props.content.description.text}</p>
            <a href={`${this.props.content.url}`} alt="">{`${this.props.content.url}`}</a>
            </>
        }
        return (
            <>
                {cardBody}
            </>
        )
    }
}

export default SearchResult;