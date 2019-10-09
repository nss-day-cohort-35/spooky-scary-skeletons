import React, { Component } from "react";
import NavBar from "./nav/NavBar";
import ApplicationViews from "./ApplicationViews";
import "./Spooky.css";

class Spooky extends Component {

  state = {
    user: localStorage.getItem('credentials') !== null
  };

  // Check if credentials are in local storage and returns true/false
  isAuthenticated = () => localStorage.getItem('credentials') !== null;

  setUser = authObj => {
    // For now, just store the email and password that the customer enters into local storage.
    localStorage.setItem('credentials', JSON.stringify(authObj));
    this.setState({
      user: this.isAuthenticated()
    });
  };

  // componentDidMount() {
  // 	this.setState({
  // 		user: this.isAuthenticated()
  // 	});
  // }

  clearUser = () => {
    localStorage.clear();

    this.setState({
      user: this.isAuthenticated()
    });
  };

  //pass setUser and clearUser as props to the NavBar components
  render() {
    return (
      <React.Fragment>
        <NavBar user={this.state.user} clearUser={this.clearUser} />
        <ApplicationViews user={this.state.user} setUser={this.setUser} />
      </React.Fragment>
    );
  }
}

export default Spooky;
