import React, {Component} from 'react';
import APIManager from '../../modules/APIManager';
import {Button,Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input} from 'reactstrap'


class TaskForm extends Component {
    state = {
        userId:"",
        task: "",
        date: "",
        completed: false,
        loadingStaus: false,
       
    }

    handleFieldChange = e => {
        const stateToChange = {}
        stateToChange[e.target.id] = e.target.value;
        this.setState(stateToChange)
    }

    constructNewTask = e => {
        e.preventDefault();
        
        if (this.state.taskName === '' || this.state.taskDate === '') {
            window.alert('Field is required')
        } else {
            this.setState({loadingStaus: true})
            let returnedStorage = localStorage.getItem('credentials')
            let currentUser = JSON.parse(returnedStorage)[0]

            const task = {
                userId: currentUser.id,
                task: this.state.task,
                date: this.state.date,
                completed: false,
               
            }
            console.log(task)
            APIManager.post(task, "tasks").then(() => {
                this.props.toggle();
                this.props.getData()
            });
        }
    }

    //toggle = this.toggle.bind(this)

   

    render() {
         const closeBtn = <button className="close" onClick={this.props.toggle}>&times;</button>;
        return(
            <>
            <Form>
                <Modal isOpen={this.props.isModalOpen} fade={false} toggle={this.props.toggle} className={this.props.className}>
                <ModalHeader toggle={this.props.toggle}>ADD TASK</ModalHeader>
                <ModalBody>
                <Form>
                    <FormGroup>
                        <Label htmlFor="task">Task</Label>
                        <Input type="text" required onChange={this.handleFieldChange} id="task"></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="date">Date</Label>
                        <Input type="date" required onChange={this.handleFieldChange} id="date"></Input>
                    </FormGroup>
                </Form>
                </ModalBody>
                <ModalFooter>
                     <Button disabled={this.state.loadingStaus}
                             onClick={this.constructNewTask} >
                             Save
                    </Button>
                </ModalFooter>
                </Modal>
            </Form>
            </>
        )

    }
}

export default TaskForm