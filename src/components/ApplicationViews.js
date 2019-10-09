import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import EntryList from './Feed/EntryList'
import EntryForm from './Feed/EntryForm'

export default class ApplicationViews extends Component {

  render() {
    return (
      <React.Fragment>

        <Route
          exact path="/" render={props => {
            return null
            // Remove null and return the component which will show news articles
          }}
        />
        {/* ------------articles------------ */}
        <Route exact path="/articles" render={props => {
          return <EntryList database="articles" {...props} />
        }}
        />
        <Route path="/articles/new" render={(props) => {
          return <EntryForm database="articles" {...props} />
        }} />
        {/* ------------events------------ */}
        <Route exact path="/events" render={props => {
          return <EntryList database="events" {...props} />
          // Remove null and return the component which will show the messages
        }}
        />

        <Route
          path="/tasks" render={props => {
            return null
            // Remove null and return the component which will show the user's tasks
          }}
        />

      </React.Fragment>
    );
  }
}
