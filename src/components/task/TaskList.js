import React, {Component} from 'react';
import TaskCard from './TaskCard';
import APIManager from '../../modules/APIManager';


class TaskList extends Component {
    state = {
        tasks: []
    };

    componentDidMount(){
        console.log('TASK LIST: ComponentDidMount');
        APIManager.getAll("tasks").then((task) => {
            this.setState({
                tasks: task
            })
        })
    }


    render() {
        console.log('TASK LIST: Render');
        return(
            <>
            <div>
                <button  type ='button'
                         className = 'btn'
                         onClick = {() => {
                        this.props.history.push('/tasks/new')
                    }}>
                   Add Task
                </button>
            </div>
            <div>
                {this.state.tasks.map(task => (
                    <TaskCard key = {task.id}
                              task = {task}
                    />
                ))}
            </div>
            </>
        )
    }
}

export default TaskList;