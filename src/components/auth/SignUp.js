import React, { Component } from "react"

class SignUp extends Component {

    // Set initial state
    state = {
        name: "",
        username: "",
        email: "",
        password: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleSignUp = (e) => {

        e.preventDefault()
		/*
			For now, just store the email and password that
			the customer enters into local storage.
		*/
        //let credentials = { email: this.state.email, password: this.state.password }
        /*
                let inputData = {
                    name: this.state.name,
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password
                }
        
                this.props.newUser(inputData);
                this.props.history.push("/");
                */
    }

    render() {
        return (
            <form onSubmit={this.handleSignUp}>
                <fieldset>
                    <h3>Please sign up</h3>
                    <div className="formgrid">

                        <input onChange={this.handleFieldChange} type="name"
                            id="name"
                            placeholder="Name"
                            required="" autoFocus="" />
                        <label htmlFor="inputName">Name</label><br />

                        <input onChange={this.handleFieldChange} type="userName"
                            id="username"
                            placeholder="Username"
                            required="" autoFocus="" />
                        <label htmlFor="inputUsername">Username</label><br />

                        <input onChange={this.handleFieldChange} type="email"
                            id="email"
                            placeholder="Email address"
                            required="" autoFocus="" />
                        <label htmlFor="inputEmail">Email address</label><br />

                        <label htmlFor="inputPassword">Password</label>
                        <input onChange={this.handleFieldChange} type="password"
                            id="password"
                            placeholder="Password"
                            required="" />

                    </div>
                    <button type="submit">Sign Up</button>
                </fieldset>
            </form>
        )
    }
}

export default SignUp
