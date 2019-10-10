import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import moment from "moment";

// logged in user
let currentUser = "1"
class SearchResult extends Component {
    render() {
        let cardBody;
        let i = this.props.i

        // set the card body as article or event
        if (`${this.props.database}` === 'articles') {
            let hasAllKeys = true
            let keys = ["urlToImage", "title", "description", "url"];
            keys.forEach(key => {if (this.props.content[key] === null) { hasAllKeys = false }})
            if (hasAllKeys) {
                cardBody = 
                <div>
                    <img ref={`img${i}`} className="result-img" src={`${this.props.content.urlToImage}`} alt=""></img>
                    <h5 ref={`title${i}`}>{this.props.content.title}</h5>
                    <p ref={`description${i}`}>{this.props.content.description}</p>
                    <a ref={`url${i}`} href={`${this.props.content.url}`} alt="">{`${this.props.content.url}`}</a>
                    <input type="text" required onKeyPress={(evt) => this.props.postResult.article(evt, this.props.content)} id={`input_article-${i}`} placeholder={'Write something about this...'} />
                </div>
            }
        }
        else if (`${this.props.database}` === 'events') {
            let hasAllKeys = true
            let keys = ["logo", "name", "description", "url"];
            keys.forEach(key => {if (this.props.content[key] === null) { hasAllKeys = false }})
            if (hasAllKeys) {
                cardBody = 
                <div>
                    <img ref={`img${i}`} className="result-img" src={`${this.props.content.logo.url}`} alt=""></img>
                    <h5 ref={`title${i}`}>{`${this.props.content.name.text}`}</h5>
                    <p ref={`description${i}`}>{this.props.content.description.text}</p>
                    <a ref={`url${i}`} href={`${this.props.content.url}`} alt="">{`${this.props.content.url}`}</a>
                    <input type="text" required onKeyPress={(evt) => this.props.postResult.event(evt, this.props.content)} id={`input_event-${i}`} placeholder={'Write Something About this ...'} />
                </div>
            }
        }
        return (
            <>
                {cardBody}
            </>
        )
    }
}

export default SearchResult;