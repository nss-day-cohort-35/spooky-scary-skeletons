import React, {Component} from 'react';
import APIManager from '../../modules/APIManager'
import {Button} from 'reactstrap'



class TaskComplete extends Component {
    
    
    render(){
        return (
            <>
            <div>
                <h3>{this.props.task.task}</h3>
                <p>Due By: {this.props.task.date}</p>
              
            </div>
            <div>
                <Button type='button' onClick={() => this.props.handleDelete(this.props.task.id)}>
						Delete
				</Button>
              
            </div>
            </>
        )
    }
}

export default TaskComplete;
