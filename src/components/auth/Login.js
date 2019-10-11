import React, { Component } from "react"
import { Link} from "react-router-dom"

import {Button,Form, FormGroup, Label, Input, Card, CardBody, Row, Col} from 'reactstrap'
class Login extends Component {

	// Set initial state
	state = {
		email: "",
		password: ""
	}

	// Update state whenever an input field is edited
	handleFieldChange = (evt) => {
		const stateToChange = {}
		stateToChange[evt.target.id] = evt.target.value
		this.setState(stateToChange)
	}

	handleLogin = (e) => {
		e.preventDefault()
		/*
			For now, just store the email and password that
			the customer enters into local storage.
		*/
		let credentials = { email: this.state.email, password: this.state.password }
		this.props.setUser(credentials);
		this.props.history.push("/");
	}

	render() {
		return (
			<div className="spooky-background">
			<Row className="my-5">
				<Col md={{size:4, offset:4}}>
			<Card>
			<CardBody>
			<Form onSubmit={this.handleLogin}>
				<FormGroup>
					<h3>Please sign in</h3>
				</FormGroup>
				<FormGroup>
					<Label htmlFor="email">Email address</Label>
					<Input onChange={this.handleFieldChange} type="email"
							   id="email"
							   placeholder="Email Address"
							   required="" autoFocus="" />
				</FormGroup>
				<FormGroup>
					<Label htmlFor="password">Password</Label>
					<Input onChange={this.handleFieldChange} type="password"
							id="password"
							placeholder="Password"
							required="" />
				</FormGroup>	
				<FormGroup>
					    <Button type="submit">Sign in</Button>
				</FormGroup>
			</Form>
			</CardBody>
			</Card>
			<div className="text-center">
			<Link className="nav-link" to="/signup">Register!</Link>
			</div>
			
			</Col>
			</Row>
			</div>
		)
	}

}

export default Login
