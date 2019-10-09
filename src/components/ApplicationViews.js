import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import EntryList from './Feed/EntryList'
import SearchPage from './Feed/SearchPage'
import Login from "./auth/Login";

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
        {/* ---------articles---------*/}
        <Route exact path="/articles" render={props => {
          if (this.props.user) {
            return <EntryList database="articles" {...props} />
          } else {
            return <Redirect to="/login" />;
          }
        }}
        />

        <Route path="/articles/new" render={props => {
          if (this.props.user) {
            return <SearchPage database="articles" {...props} />
          } else {
            return <Redirect to="/login" />;
          }
        }}
        />
        {/* ---------events---------*/}
        <Route exact path="/events" render={props => {
            if (this.props.user) {
              return <EntryList database="events" {...props} />
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />

        <Route path="/events/new" render={props => {
          if (this.props.user) {
            return <SearchPage database="events" {...props} />
          } else {
            return <Redirect to="/login" />;
          }
        }}
        />

        {/* ---------tasks---------*/}
        <Route
          path="/tasks" render={props => {
            if (this.props.user) {
              return null
              {/*return <TasksList {...props} />;
            */}
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        {/* ---------login---------*/}
        <Route
          path="/login" render={props => {
            return <Login setUser={this.props.setUser} {...props} />;
          }}
        />

      </React.Fragment>
    );
  }
}
