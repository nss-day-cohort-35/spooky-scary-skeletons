import React, {Component} from 'react';
import TaskCard from './TaskCard';
import APIManager from '../../modules/APIManager';
import TaskComplete from './TaskComplete';

import {Button} from 'reactstrap'
import TaskForm from './TaskForm';
import TaskEditForm from './TaskEditForm';


class TaskList extends Component {
    state = {
        tasks: [],
        finishedTasks: [],
        unfinishedTasks: [],
        isModalOpen:false,
        isEditModalOpen:false,
        
        //fields for Edit Form
        taskId: 0,
        task: "",
        date: "",
        completed: false,
        loadingStaus: true,
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
        this.setState({loadingStatus: true});
         APIManager.completeTask(id).then(()=> this.getData())
    }

    handleEdit = (id) => {
        APIManager.getAll("tasks").then(tasks => {
            APIManager.get(id, "tasks")
            .then(task => {
                this.setState({
                    taskId: id,
                    task: task.task,
                    date: task.date,
                    completed: task.completed

                })
            })
        })
        this.setState(prevState => ({
            isEditModalOpen: !prevState.isEditModalOpen
        }))
    }

    toggle = () => {
        this.setState(prevState => ({
            isModalOpen: !prevState.isModalOpen
        }))
    }

    editToggle = () => {
        this.setState(prevState => ({
            isEditModalOpen: !prevState.isEditModalOpen
        }))
        
    }

    //handle field change function for edit form
    handleFieldChange = e => {
      
        const stateToChange = {}
        stateToChange[e.target.id] = e.target.value
        this.setState(stateToChange) 
    }

    //handle checkbox change for edit form
    handleCheck= e=> {
        this.setState({completed: !this.state.completed});
    }
  
    //save edited task
    updateTask = e => {
        e.preventDefault()
        this.setState({loadingStaus: true});
        const editTask = {
            id: this.state.taskId,
            task: this.state.task,
            date: this.state.date,
            completed: JSON.parse(this.state.completed)
        }
        APIManager.update(editTask, "tasks").then(()=> {this.editToggle(); this.getData()})

    }

    render() {
        console.log('TASK LIST: Render');
        return(
            <>
            <div>
                <Button  type ='button'
                         className = 'btn m-3'
                         color="secondary"
                         size="sm" 
                         onClick = {() => {
                         this.toggle()
                    }}>
                   Add Task
                </Button>
            </div>
            <div>
                <h1>Unfinished Tasks</h1>
                {this.state.unfinishedTasks.map(task => (
                    <TaskCard key = {task.id}
                              task = {task}
                              handleDelete = {this.handleDelete}
                              handleComplete = {this.handleComplete}
                              handleEdit = {this.handleEdit}
                              editToggle = {this.editToggle}
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
                              editToggle = {this.editToggle}
                              {...this.props}
                    />
                ))}
            </div>
            <div>
                <TaskForm toggle={this.toggle} 
                          isModalOpen = {this.state.isModalOpen} 
                          getData={this.getData} 
                          {...this.props}/>
            </div>
            <div>
                <TaskEditForm editToggle={this.editToggle}
                              isEditModalOpen = {this.state.isEditModalOpen}
                              getData = {this.getData}
                              taskId = {this.state.taskId}
                              task = {this.state.task}
                              date = {this.state.date}
                              completed = {this.state.completed}
                              handleFieldChange= {this.handleFieldChange}
                              handleCheck={this.handleCheck}
                              updateTask={this.updateTask}
                              {...this.props}/>
            </div>
            </>
        )
    }
}

export default TaskList;