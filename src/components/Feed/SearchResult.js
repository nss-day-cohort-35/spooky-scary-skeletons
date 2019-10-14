import React, { Component } from 'react';
import './Feed.css'
import '../Spooky.css'
class SearchResult extends Component {
    render() {
        let cardBody;
        // create a search result card (from news articles API)  - don't allow result to populate if it has a null key
        if (`${this.props.database}` === 'articles') {
            let hasAllKeys = true
            let keys = ["urlToImage", "title", "description", "url"];
            keys.forEach(key => { if (this.props.content[key] === null) { hasAllKeys = false } })
            if (hasAllKeys) {
                cardBody =
                    <div>
                        <img className="result-img" src={`${this.props.content.urlToImage}`} alt=""></img>
                        <h5>{this.props.content.title}</h5>
                        <p className="normal-text">{this.props.content.description}</p>
                        <a className="card-link" href={`${this.props.content.url}`} alt="">{`${this.props.content.url}`}</a>
                        <input className="write-something" type="text" required onKeyPress={(evt) => this.props.postResult.article(evt, this.props.content)} placeholder={'Write something about this...'} />
                    </div>
            }
        }
        // create a search result card (from events API) - don't allow result to populate if it has a null key
        else if (`${this.props.database}` === 'events') {
            let hasAllKeys = true
            let keys = ["logo", "name", "description", "url"];
            keys.forEach(key => { if (this.props.content[key] === null) { hasAllKeys = false } })
            if (hasAllKeys) {
                cardBody =
                    <div className="result-card">
                        <img className="result-img" src={`${this.props.content.logo.url}`} alt=""></img>
                        <h5>{`${this.props.content.name.text}`}</h5>
                        <p className="normal-text">{this.props.content.description.text}</p>
                        <a className="card-link" href={`${this.props.content.url}`} alt="">{`${this.props.content.url}`}</a>
                        <input className="write-something" type="text" required onKeyPress={(evt) => this.props.postResult.event(evt, this.props.content)} placeholder={'Write Something About this ...'} />
                    </div>
            }
        }
        // return the single card
        return (
            <>
                {cardBody}
            </>
        )
    }
}

export default SearchResult;