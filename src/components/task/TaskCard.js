import React, {Component} from 'react';
import APIManager from '../../modules/APIManager'
import {Button} from 'reactstrap'



class TaskCard extends Component {
    
    
    render(){
        return (
            <>
            <div>
                <h3>{this.props.task.task}</h3>
                <p>Due By: {this.props.task.date}</p>
              
            </div>
            <div>
               
                <Button type="button" color="secondary"
            		  onClick={() => {this.props.history.push(`/tasks/${this.props.task.id}/edit`)}}>Edit
          		</Button>
                <Button type='button' color="secondary"
                      onClick={() => this.props.handleDelete(this.props.task.id)}>
						Delete
				</Button>
                <Button type='button' color="secondary"
                      onClick={() => this.props.handleComplete(this.props.task.id)}>
						Complete
				</Button>
            </div>
            </>
        )
    }
}

export default TaskCard;
