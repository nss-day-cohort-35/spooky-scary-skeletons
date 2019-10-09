import React, {Component} from 'react';


class TaskCard extends Component {
    render(){
        return (
            <div>
                <h3>Name:{this.props.task.task}</h3>
                <p>Complete Date:{this.props.task.date}</p>
                 <input type="checkbox">Complete</input>
            </div>
        )
    }
}

export default TaskCard;
