import React, { Component } from "react";
import NavBar from "./nav/NavBar";
import ApplicationViews from "./ApplicationViews";
import "./Spooky.css";
import APIManager from '../modules/APIManager'

class Spooky extends Component {

  state = {
    user: localStorage.getItem('credentials') !== null, //

    query: {
      table: "users",
      email: "",
      password: ""
    }

  };

  checkData = (authObj) => {
    //console.log("Spooky query after:", this.state.query)

    APIManager.getRecord(this.state.query)
      .then(userList => {
        if (userList.length) {
          //
          localStorage.setItem('credentials', JSON.stringify(authObj));
          this.setState({
            user: this.isAuthenticated()
          });
        } else {
          alert("Input data is not valid. Try again!");
        }
      })
  }

  // Check if credentials are in local storage and returns true/false
  isAuthenticated = () => localStorage.getItem('credentials') !== null;

  setUser = authObj => {
    //console.log("Spooky authObj", authObj)
    //console.log("Spooky query before:", this.state.query)

    this.setState(updater => ({
      query: {
        table: updater.query.table,
        email: authObj.email,
        password: authObj.password
      }
    }), () => { this.checkData(authObj) }
    )
  }

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
