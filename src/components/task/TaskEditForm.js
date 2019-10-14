import React, {Component} from 'react'
import APIManager from '../../modules/APIManager'
import {Button,Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap'

class TaskEditForm extends Component{
    state = {
        /* task: "",
        date: "",
        completed: false, */
        loadingStaus: true,
       
    }

    
    
    componentDidMount(props){
        /*console.log(this.props)
        APIManager.getAll("tasks").then(tasks => {
            APIManager.get(this.props.selectedTaskId, "tasks")
            .then(task => {
                
                this.setState({
                    task: task.task,
                    date: task.date,
                    completed: task.completed

                })
            })
        })*/
    }

    
    render () {
        const closeBtn = <button className="close" onClick={this.props.editToggle}>&times;</button>;
        return(
            <>
                   <Modal isOpen={this.props.isEditModalOpen} fade={false} toggle={this.props.editToggle} className={this.props.className}>
                   <ModalHeader toggle={this.props.editToggle}>EDIT TASK</ModalHeader>
                   <ModalBody>
                    <Form>
                    <FormGroup>
                        <Label htmlFor="task">Task</Label>
                        <Input type="text" required onChange={this.props.handleFieldChange} value={this.props.task} id="task"
                        ></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="date">Date</Label>
                        <Input type="date" required onChange={this.props.handleFieldChange} value={this.props.date} id="date"></Input>
                    </FormGroup>
                                      
                    <InputGroup>
                         <InputGroupAddon addonType="prepend">
                         <InputGroupText>
                         <Input addon type="checkbox" onChange={this.props.handleCheck}  id="completed" checked={this.props.completed} aria-label="Checkbox for following text input" />
                         </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Complete" />
                    </InputGroup>
                    </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Input type="hidden" value={this.props.taskId} id="taskId"/>
                         <Button  
                           onClick={this.props.updateTask} >
                           Save
                        </Button>
                   </ModalFooter>
                   </Modal>
           </>
        )
    }
}

export default TaskEditForm