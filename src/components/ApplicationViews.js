import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import ChatList from './chatroom/ChatList'
import ChatEditForm from './chatroom/ChatEditForm'
import EntryList from './Feed/EntryList'
import SearchPage from './Feed/SearchPage'
import TaskList from './task/TaskList'
import TaskForm from './task/TaskForm'
import TaskEditForm from './task/TaskEditForm'
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import Dashboard from "./dashboard/dashboard";


export default class ApplicationViews extends Component {

  render() {
    return (
      <React.Fragment>

        <Route exact path="/dashboard" render={props => {
          if (this.props.user) {
            return <Dashboard {...props} />
          } else {
            return <Redirect to="/login" />;
          }
        }}
        />

        {/* ---------Chat---------*/}
        <Route path="/chat" render={props => {
          if (this.props.user) {
            return <ChatList  {...props} />
          } else {
            return <Redirect to="/login" />;
          }
        }}
        />
        <Route path="chat/:chatId(\d+)/edit" render={props => {
          return <ChatEditForm {...props} />
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
            if (this.props.user) {
              return <TaskForm database="tasks" {...props} />
            } else {
              return <Redirect to="/login" />
            }
          }}
        />
        <Route path="/tasks/:taskId(\d+)/edit" render={props => {
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
            return <SignUp newUser={this.props.newUser} {...props} />
          } else {
            return <Redirect to="/login" />;
          }
        }} />

        <Route exact path="/" render={props => {
          if (this.props.user) {
            return <Dashboard {...props} />
          }
        }} />

      </React.Fragment>
    );
  }
}
