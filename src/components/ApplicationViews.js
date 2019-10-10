import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import ChatList from './chatroom/ChatList'
import EntryList from './Feed/EntryList'
import TaskList from './task/TaskList'
import EntryForm from './Feed/EntryForm'
import TaskForm from './task/TaskForm'
import TaskEditForm from './task/TaskEditForm'
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";

export default class ApplicationViews extends Component {

  render() {
    return (
      <React.Fragment>

        <Route exact path="/" render={props => {
          if (this.props.user) {
            return <ChatList {...props} />
          } else {
            return <Redirect to="/login" />;
          }
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
           exact path="/tasks" render={props => {
            if (this.props.user) {
              return <TaskList database="tasks" {...props} />
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />  
        <Route
          path="/tasks/new" render={props => {
            if(this.props.user) {
              return <TaskForm database="tasks" {...props} />
            } else {
              return <Redirect to="/login" />
            }
          }}
          />  
           <Route  path="/tasks/:taskId(\d+)/edit" render={props => {
          return <TaskEditForm {...props} />
          }}
        />

        {/* ---------login---------*/}
        <Route path="/login" render={props => {
          if (!this.props.user) {
            return <Login setUser={this.props.setUser} {...props} />
          } else {
            return <Redirect to="/login" />;
          }
        }} />

        <Route path="/signup" render={props => {
          if (!this.props.user) {
            return <SignUp {...props} />
          } else {
            return <Redirect to="/login" />;
          }
        }} />

      </React.Fragment>
    );
  }
}
