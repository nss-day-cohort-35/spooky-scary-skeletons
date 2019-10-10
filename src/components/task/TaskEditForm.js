import React, {Component} from 'react'
import APIManager from '../../modules/APIManager'
import {Button,Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap'

class TaskEditForm extends Component{
    state = {
        task: "",
        date: "",
        completed: false,
        loadingStaus: true,
        modal: true
    }

    handleFieldChange = e => {
      
        const stateToChange = {}
        stateToChange[e.target.id] = e.target.value
        this.setState(stateToChange) 
    }

    handleCheck= e=> {
        this.setState({completed: !this.state.completed});
      }
  
    updateTask = e => {
        e.preventDefault()
        this.setState({loadingStaus: true});
        const editTask = {
            id: this.props.match.params.taskId,
            task: this.state.task,
            date: this.state.date,
            completed: JSON.parse(this.state.completed)
        }
        APIManager.update(editTask, "tasks").then(()=> this.props.history.push("/tasks"))

    }
    
    componentDidMount(){
        APIManager.getAll("tasks").then(tasks => {
            APIManager.get(this.props.match.params.taskId, "tasks")
            .then(task => {
                this.setState({
                    task: task.task,
                    date: task.date,
                    completed: task.completed

                })
            })
        })
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }

    render () {
        const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>;
        return(
            <>
                   <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle} className={this.props.className}>
                   <ModalHeader toggle={this.toggle}>EDIT TASK</ModalHeader>
                   <ModalBody>
                    <Form>
                    <FormGroup>
                        <Label htmlFor="task">Task</Label>
                        <Input type="text" required onChange={this.handleFieldChange} value={this.state.task}id="task"
                        ></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="date">Date</Label>
                        <Input type="date" required onChange={this.handleFieldChange} value={this.state.date} id="date"></Input>
                    </FormGroup>
                    {/* <FormGroup>
                        <Label htmlFor="completed">Complete</Label>
                        <Input type="checkbox" onChange={this.handleCheck}  id="completed" checked={this.state.completed}></Input>
                    </FormGroup> */}
                    <InputGroup>
                         <InputGroupAddon addonType="prepend">
                         <InputGroupText>
                         <Input addon type="checkbox" onChange={this.handleCheck}  id="completed" checked={this.state.completed} aria-label="Checkbox for following text input" />
                         </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Complete" />
                    </InputGroup>
                    </Form>
                    </ModalBody>
                    <ModalFooter>
                         <Button  
                           onClick={this.updateTask} >
                           Save
                        </Button>
                   </ModalFooter>
                   </Modal>
           </>
        )
    }
}

export default TaskEditForm