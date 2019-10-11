import React, { Component } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap'

class SignUp extends Component {

    // Set initial state
    state = {
        name: "",
        username: "",
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

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }

    render() {
        const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>;
        return (
            <>
                <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle} className={this.props.className}>
                    <Form onSubmit={this.handleSignUp}>
                        <ModalHeader toggle={this.toggle}>Please sign up</ModalHeader>

                        <ModalBody>
                            <div className="formgrid">

                                <FormGroup>
                                    <Label htmlFor="name">Name</Label>
                                    <Input onChange={this.handleFieldChange} type="text"
                                        id="name"
                                        placeholder="Name"
                                        required="" autoFocus="" />
                                </FormGroup>

                                <FormGroup>
                                    <Label htmlFor="username">Username</Label>
                                    <Input onChange={this.handleFieldChange} type="text"
                                        id="username"
                                        placeholder="Username"
                                        required="" autoFocus="" />
                                </FormGroup>

                                <FormGroup>
                                    <Label htmlFor="email">Email address</Label>
                                    <Input onChange={this.handleFieldChange} type="email"
                                        id="email"
                                        placeholder="Email address"
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
                                    <Label htmlFor="password_confirm">Password confirm</Label>
                                    <Input onChange={this.handleFieldChange} type="password"
                                        id="password_confirm"
                                        placeholder="Password Confirm"
                                        required="" />
                                </FormGroup>

                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" color="secondary">
                                Sign Up
                            </Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </>
        )
    }
}

export default SignUp
