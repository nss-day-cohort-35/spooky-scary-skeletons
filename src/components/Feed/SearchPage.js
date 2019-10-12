import React, { Component } from 'react';
import API from '../../modules/APIManager'
import SearchResult from './SearchResult'
import moment from "moment";

// logged in user
let currentUser = "1"
class SearchPage extends Component {
    state = {
        searchResults: []
    };
    render() {
        // set up and empty article or event 
        let entryObject = {
            userId: "",
            date: "",
            message: "",
            image: "",
            title: "",
            description: "",
            url: ""
        }
        // this gets called from SearchResult.js - if a user hits enter,  create an object using the content from that search result
        const postResult = {
            article: (evt, content) => {
                if (evt.charCode === 13) {
                    entryObject.image = content.urlToImage
                    entryObject.title = content.title
                    entryObject.description = content.description
                    entryObject.url = content.url
                    postResult.post(evt.target.value);
                }
            },
            event: (evt, content) => {
                if (evt.charCode === 13) {
                    entryObject.image = content.logo.url
                    entryObject.title = content.name.text
                    entryObject.description = content.description.text
                    entryObject.url = content.url
                    postResult.post(evt.target.value);
                }
            },
            // add userId, date, and typed input from SearchResult.js to the entryObject and post to JSON
            post: (message) => {
                entryObject.message = message
                entryObject.userId = currentUser
                entryObject.date = moment().format("lll")
                console.log(entryObject)
                API.post(entryObject, `${this.props.database}`)
                this.props.history.push(`/${this.props.database}`)
                
            }
        }
        // search newsAPI or Eventbrite for something to post
        const searchAPI = (evt) => {
            if (evt.charCode === 13) {
                API[this.props.database](evt.target.value).then(response => this.setState({ searchResults: [...response] }))
            }
        }
        // return a list of results - pass postResult(funtionality) and the API result(content) as props to each <SearchResult/>
        return (
            <>
                <h4>Search {this.props.database}</h4>
                <input type="text" required onKeyPress={searchAPI} id={'searchInput'} placeholder={'search'} />
                <div className="search-results-cards">
                    {this.state.searchResults.map((result, i) => <SearchResult key={`result-${i}`} content={result} postResult={postResult} {...this.props} />)}
                </div>
            </>
        )
    }
}

export default SearchPage;