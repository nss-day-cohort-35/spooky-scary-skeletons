import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import ChatList from './chatroom/ChatList'
import EntryList from './Feed/EntryList'
import EntryForm from './Feed/EntryForm'
import Login from "./auth/Login";

export default class ApplicationViews extends Component {

  render() {
    return (
      <React.Fragment>

        <Route
          exact path="/" render={props => {
            return <ChatList {...props}/> 
            // Remove null and return the component which will show news articles
          }}
        />
         {/* ---------articles---------*/}
        <Route path="/articles" render={props => {
          if (this.props.user) {
            return <EntryList database="articles" {...props} />
          } else {
            return <Redirect to="/login" />;
          }
        }}
        />

        <Route path="/articles/new" render={props => {
          if (this.props.user) {
            return <EntryForm database="articles" {...props} />
          } else {
            return <Redirect to="/login" />;
          }
        }}
        />
        {/* ---------events---------*/}
        <Route
          path="/events" render={props => {
            if (this.props.user) {
              return <EntryList database="events" {...props} />
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
