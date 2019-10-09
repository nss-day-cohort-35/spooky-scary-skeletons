import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
//
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

        <Route
          path="/news" render={props => {
            if (this.props.user) {
              return null
              {/*return <NewsList {...props} />;
            */}
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />

        <Route
          path="/events" render={props => {
            if (this.props.user) {
              return null
              {/*return <EventsList {...props} />;
            */}
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />

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

        {/*

        */}
        <Route
          path="/login" render={props => {
            return <Login setUser={this.props.setUser} {...props} />;
          }}
        />

      </React.Fragment>
    );
  }
}
