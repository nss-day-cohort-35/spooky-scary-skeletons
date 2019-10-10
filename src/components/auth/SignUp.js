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

        let inputData = {
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm
        }

        this.props.newUser(inputData);
        this.props.history.push("/");

    }

    render() {
        return (
            <form onSubmit={this.handleSignUp}>
                <fieldset>
                    <h3>Please sign up</h3>
                    <div className="formgrid">

                        <label htmlFor="name">Name</label>
                        <input onChange={this.handleFieldChange} type="text"
                            id="name"
                            placeholder="Name"
                            required="" autoFocus="" /><br />

                        <label htmlFor="username">Username</label>
                        <input onChange={this.handleFieldChange} type="text"
                            id="username"
                            placeholder="Username"
                            required="" autoFocus="" /><br />

                        <label htmlFor="email">Email address</label>
                        <input onChange={this.handleFieldChange} type="email"
                            id="email"
                            placeholder="Email address"
                            required="" autoFocus="" /><br />

                        <label htmlFor="password">Password</label>
                        <input onChange={this.handleFieldChange} type="password"
                            id="password"
                            placeholder="Password"
                            required="" /><br />

                        <label htmlFor="password_confirm">Password confirm</label>
                        <input onChange={this.handleFieldChange} type="password"
                            id="password_confirm"
                            placeholder="Password Confirm"
                            required="" />

                    </div>
                    <button type="submit">Sign Up</button>
                </fieldset>
            </form>
        )
    }
}

export default SignUp
