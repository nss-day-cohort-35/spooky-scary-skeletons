import React, {Component} from 'react';
import APIManager from '../../modules/APIManager'


class TaskCard extends Component {
    handleDelete = () => {
        APIManager.delete(id, "tasks").then(() => this.props.getData())
    }
    render(){
        return (
            <>
            <div>
                <h3>Name:{this.props.task.task}</h3>
                <p>Complete Date:{this.props.task.date}</p>
              
            </div>
            <div>
                <button type="button"
            		  onClick={() => {this.props.history.push(`/tasks/${this.props.task.id}/edit`)}}>Edit
          		</button>
                <button type='button' onClick={() => this.handleDelete(this.props.task.id)}>
						Delete
				</button>
            </div>
            </>
        )
    }
}

export default TaskCard;
