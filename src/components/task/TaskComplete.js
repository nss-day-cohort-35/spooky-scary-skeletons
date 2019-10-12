import React, {Component} from 'react';
import APIManager from '../../modules/APIManager'
import {Button} from 'reactstrap'



class TaskComplete extends Component {
    
    
    render(){
        return (
            <>
            <div>
                <h5>{this.props.task.task}</h5>
                <p>Due By: {this.props.task.date}</p>
              
            </div>
            <div className="mb-2">
                <Button type='button' 
                        size="sm" className="mx-1"
                        onClick={() => this.props.handleDelete(this.props.task.id)}>
						Delete
				</Button>
              
            </div>
            </>
        )
    }
}

export default TaskComplete;
