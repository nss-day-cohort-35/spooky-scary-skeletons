import React, {Component} from 'react'
import APIManager from '../../modules/APIManager'

class TaskEditForm extends Component{
    state = {
        
        task: "",
        date: "",
        completed: false,
        loadingStaus: true
    }

    handleFieldChange = e => {
        
        console.log(e)
        const stateToChange = {}
        stateToChange[e.target.id] = e.target.value
        this.setState(stateToChange) 
    }

    updateTask = e => {
        e.preventDefault()
        this.setState({loadingStaus: true});
        const editTask = {
            id: this.props.match.params.taskId,
            task: this.state.task,
            date: this.state.date,
        }
        APIManager.update(editTask, "tasks").then(()=> this.props.history.push("/tasks"))

    }
    
    componentDidMount(){
        APIManager.getAll("tasks").then(tasks => {
            APIManager.get(this.props.match.params.taskId, "tasks")
            .then(task => {
                this.setState({
                    task: task.task,
                    date: task.date

                })
            })
        })
    }
    render(){
        return(
            <form>
                <fieldset>
                    <div className='formgrid'>
                        <label for="taskName">Task</label>
                        <input type="text" required onChange={this.handleFieldChange} value={this.state.task}id="task"
                        ></input>
                    </div>
                    <div className='formgrid'>
                        <label for="taskDate">Date</label>
                        <input type="date" required onChange={this.handleFieldChange} value={this.state.date} id="date"></input>
                    </div>
                    <div>
                        <button type="button" 
                                              onClick={this.updateTask} >
                                Save
                        </button>
                    </div>
                </fieldset>
            </form>
        )
    }
}

export default TaskEditForm