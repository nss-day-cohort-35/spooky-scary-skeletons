import React, {Component} from 'react';
import APIManager from '../../modules/APIManager'
import {Button} from 'reactstrap'
import moment from "moment";


class TaskComplete extends Component {
    
    
    render(){
        return (
            <>
            <div>
                <h5>{this.props.task.task}</h5>
                <p>Due By: {moment(this.props.task.date).format("ll")}</p>
              
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
