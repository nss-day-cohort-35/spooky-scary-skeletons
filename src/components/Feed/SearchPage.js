import React, { Component } from 'react';
import API from '../../modules/APIManager'
import SearchResult from './SearchResult'

// logged in user
let currentUser = "1"
class SearchPage extends Component {
    state = {
        searchResults: []
    };
    render() {
        let entryObject = {
            userId: "",
            date: "",
            image: "",
            title: "",
            description: "",
            url: ""
        }
        const postResult = {
            article: (evt, content) => {
                if (evt.charCode === 13) {
                    entryObject.image = content
                    entryObject.title = content
                    entryObject.description = content
                    entryObject.url = content
                    console.log(entryObject)
                }
            },
            event: (evt, content) => {
                if (evt.charCode === 13) {
                    entryObject.image = content
                    entryObject.title = content
                    entryObject.description = content
                    entryObject.url = content
                    console.log(content)
                }
            },
            post: () => {
            }
        }
        const searchAPI = (evt) => {
            if (evt.charCode === 13) {
                API[this.props.database](evt.target.value).then(response => this.setState({ searchResults: [...response] }))
            }
        }
        return (
            <>
                <input type="text" required onKeyPress={searchAPI} id={'searchInput'} placeholder={'search'} />
                <div className="search-results-cards">
                    {this.state.searchResults.map((result, i) => <SearchResult key={`result-${i}`} content={result} postResult={postResult} {...this.props} />)}
                </div>
            </>
        )
    }
}

export default SearchPage;