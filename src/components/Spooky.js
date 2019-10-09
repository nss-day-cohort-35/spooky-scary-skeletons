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

  // Check if credentials are in local storage and returns true/false
  isAuthenticated = () => localStorage.getItem('credentials') !== null;

  setUser = authObj => {
    // For now, just store the email and password that the customer enters into local storage.
    //
    //
    //let credentials = { email: this.state.email, password: this.state.password }
    //

    console.log("Spooky authObj", authObj)

    console.log("Spooky query before:", this.state.query)

    this.setState(prevState => ({
      query: {
        table: prevState.query.table,
        email: authObj.email,
        password: authObj.password
      }
    }))

    console.log("Spooky query after:", this.state.query)

    APIManager.getRecord(this.state.query)      //
      //
      .then(userList => {
        if (userList.length) {
          //
          localStorage.setItem('credentials', JSON.stringify(authObj));
          this.setState({
            user: this.isAuthenticated()
          });
          /*}
                    signData = newSignData(
                      userList[0].userName,
                      userList[0].password,
                      userList[0].id
                    );
                    sessionStorageData(signData);
                    document.querySelector("#auth-signin-button").innerHTML = "Sign Out";
                    removeSignSection("signin-section");
                    //
                    document.location.reload(); */
        } else {
          alert("Input data is not valid. Try again!");
        }
      });
    //
    //
    /*
    localStorage.setItem('credentials', JSON.stringify(authObj));
    this.setState({
      user: this.isAuthenticated()
    }); 
  */
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
