import React, {Component} from 'react'
import APIManager from '../../modules/APIManager'
import {Button,Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap'

class TaskEditForm extends Component{
    state = {
        userId: "",
        date: "",
        message: "",
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
  
    updateChat = e => {
        e.preventDefault()
        this.setState({loadingStaus: true});
        const editChat = {
            id: this.props.match.params.chatId,
            message: this.state.message,
            date: this.state.date,
            userId: this.state.userId
        }
        APIManager.update(editChat, "messages").then(()=> this.props.history.push("/"))

    }
    
    componentDidMount(){
        APIManager.getAll("messages").then(tasks => {
            APIManager.getAndExpand(this.props.match.params.chatId,"messages","user")
            .then(message => {
                console.log(message)
                this.setState({
                    userId: message.userId,
                    date: message.date,
                    message: message.message
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
                   <ModalHeader toggle={this.toggle}>EDIT Chat</ModalHeader>
                   <ModalBody>
                    <Form>
                    <FormGroup>
                        <Label htmlFor="message">Editing Post</Label>
                        <Input type="text" required onChange={this.handleFieldChange} value={this.state.task}id="message"
                        ></Input>
                    </FormGroup>
                    {/* <FormGroup>
                        <Label htmlFor="completed">Complete</Label>
                        <Input type="checkbox" onChange={this.handleCheck}  id="completed" checked={this.state.completed}></Input>
                    </FormGroup> */}
                    </Form>
                    </ModalBody>
                    <ModalFooter>
                         <Button  
                           onClick={this.updateChat} >
                           Save
                        </Button>
                   </ModalFooter>
                   </Modal>
           </>
        )
    }
}

export default TaskEditForm