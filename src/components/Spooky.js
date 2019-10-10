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
      password: "",
      user: "",
      username: ""
    }
  };

  checkData = () => {
    //console.log("Spooky query after:", this.state.query)

    APIManager.getRecord(this.state.query)
      .then(userList => {
        if (userList.length) {
          //
          console.log("Spooky getRecord userList", userList)
          //
          localStorage.setItem('credentials', JSON.stringify(userList));
          this.setState({
            user: this.isAuthenticated()
          });
          console.log("Spooky credentials:", localStorage.getItem('credentials'))
          var test = localStorage.getItem('credentials')
          console.log("Spooky id:", Object.values(localStorage.credentials[0])[4])

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
        password: authObj.password,
        user: updater.query.user,
        username: updater.query.username
      }
    }), () => { this.checkData() }
    )
  }

  newUser = input => {
    //console.log("Spooky authObj", authObj)
    //console.log("Spooky query before:", this.state.query)

    //APIManager.getRecord(this.state.query)
    /*
        this.setState(updater => ({
          query: {
            table: updater.query.table,
            email: input.email,
            password: input.password,
            user: input.query.user,
            username: input.query.username
          }
        }), () => { this.checkData() }
        )
    */
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
        <ApplicationViews user={this.state.user} setUser={this.setUser} newUser={this.newUser} />
      </React.Fragment>
    );
  }
}

export default Spooky;
