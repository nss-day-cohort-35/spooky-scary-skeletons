import React, { Component } from 'react';
import API from '../../modules/APIManager'

// logged in user
let currentUser = "1"

class EntryForm extends Component {

    state = {
        searchResults: []
    };
    searchAPI(evt) {
        evt.persist();
        console.log(evt)
        API[this.props.database.json]().then(response => this.setState({ searchResults: [...response.articles] }))
    }

    componentDidMount() {
        // let resultCard;
        // if (this.props.database === "articles") {
        //     resultCard = <>

        //     </>

        //     API[this.props.database.json]().then(response => this.setState({ searchResults: [...response.articles] }))

        // }
    }

    render() {

        return (
            <>
                <input type="text" required onKeyPress={this.searchAPI} id={'searchInput'} placeholder={'search'} />
                <div className="search-results-cards">
                    {/* {this.state.searchResults.map((result, i) => resultCard)} */}
                </div>
            </>
        )
    }
}

export default EntryForm;