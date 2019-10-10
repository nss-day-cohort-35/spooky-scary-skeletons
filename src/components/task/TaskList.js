import React, {Component} from 'react';
import TaskCard from './TaskCard';
import APIManager from '../../modules/APIManager';
import TaskComplete from './TaskComplete';


class TaskList extends Component {
    state = {
        tasks: [],
        finishedTasks: [],
        unfinishedTasks: []
    };

    getData = () => {
        APIManager.getAll("tasks").then((task) => {
            this.setState({
                tasks: task
            })
            this.setState({
                finishedTasks: task.filter(t => t.completed === true)
            })
            this.setState({
                unfinishedTasks: task.filter(t => t.completed === false)
            })
        })
    }
    componentDidMount(){
        console.log('TASK LIST: ComponentDidMount');
        this.getData()
    }

    handleDelete = (id) => {
        APIManager.delete(id, "tasks").then(() => this.getData())
    }

    handleComplete = (id) => {
        this.setState({loadingStaus: true});
         APIManager.completeTask(id).then(()=> this.getData())
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
                <h1>Unfinished Tasks</h1>
                {this.state.unfinishedTasks.map(task => (
                    <TaskCard key = {task.id}
                              task = {task}
                              handleDelete = {this.handleDelete}
                              handleComplete = {this.handleComplete}
                              {...this.props}
                    />
                ))}
            </div>
            <div>
                <h1>Finished Tasks</h1>
                {this.state.finishedTasks.map(task => (
                    <TaskComplete key = {task.id}
                              task = {task}
                              handleDelete = {this.handleDelete}
                              handleComplete = {this.handleComplete}
                              {...this.props}
                    />
                ))}
            </div>
            </>
        )
    }
}

export default TaskList;