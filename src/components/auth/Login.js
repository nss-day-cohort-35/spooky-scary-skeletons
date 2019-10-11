import React, { Component } from "react"
//import { Button } from 'reactstrap'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap'


class Login extends Component {

	// Set initial state
	state = {
		email: "",
		password: "",
		modal: true
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

	toggle = () => {
		this.setState(prevState => ({
			modal: !prevState.modal
		}))
	}

	render() {
		return (
			<>
				<Modal isOpen={this.state.modal} fade={false} toggle={this.toggle} className={this.props.className}>
					<ModalHeader toggle={this.toggle}>Please sign in</ModalHeader>
					<Form onSubmit={this.handleLogin}>
						<ModalBody>
							<div className="formgrid">

								<FormGroup>
									<Label htmlFor="email">Email address</Label>
									<Input onChange={this.handleFieldChange} type="email"
										id="email"
										placeholder="Email Address"
										required="" autoFocus="" /><br />
								</FormGroup>

								<FormGroup>
									<Label htmlFor="password">Password</Label>
									<Input onChange={this.handleFieldChange} type="password"
										id="password"
										placeholder="Password"
										required="" />
								</FormGroup>

							</div>
						</ModalBody>
						<ModalFooter>
							<Button type="submit" color="secondary">Sign in</Button>
						</ModalFooter>
					</Form>
				</Modal>
			</>
		)
	}
}

export default Login
