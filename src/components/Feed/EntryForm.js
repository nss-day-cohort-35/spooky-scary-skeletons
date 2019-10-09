import React, { Component } from 'react';
import API from '../../modules/APIManager'

// logged in user
let currentUser = "1"

class EntryForm extends Component {

    state = {
        searchResults: []
    };

    componentDidMount() {
        // let resultCard;
        // if (this.props.database === "articles") {
        //     resultCard = <>

        //     </>

        //     API[this.props.database.json]().then(response => this.setState({ searchResults: [...response.articles] }))

        // }
    }

    render() {
        let database = this.props.database
        const searchAPI = (evt) => {
            if (evt.charCode === 13) {
                API[database](evt.target.value).then(response => this.setState({ searchResults: [...response] }))
            }
        }

        return (
            <>
                <input type="text" required onKeyPress={searchAPI} id={'searchInput'} placeholder={'search'} />
                <div className="search-results-cards">
                    {this.state.searchResults.map((result, i) => <p>{result.title}</p>)}
                </div>
            </>
        )
    }
}

export default EntryForm;