import React, {Component} from 'react';
import APIManager from '../../modules/APIManager'



class TaskCard extends Component {
    
    
    render(){
        return (
            <>
            <div>
                <h3>{this.props.task.task}</h3>
                <p>Due By: {this.props.task.date}</p>
              
            </div>
            <div>
               
                <button type="button"
            		  onClick={() => {this.props.history.push(`/tasks/${this.props.task.id}/edit`)}}>Edit
          		</button>
                <button type='button' onClick={() => this.props.handleDelete(this.props.task.id)}>
						Delete
				</button>
                <button type='button' onClick={() => this.props.handleComplete(this.props.task.id)}>
						Complete
				</button>
            </div>
            </>
        )
    }
}

export default TaskCard;
