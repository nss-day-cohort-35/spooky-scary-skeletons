import React, {Component} from 'react';
import APIManager from '../../modules/APIManager';


class TaskForm extends Component {
    state = {
        userId: localStorage.id,
        task: "",
        date: "",
        completed: false,
        loadingStaus: false
    }

    handleFieldChange = e => {
        const stateToChange = {}
        stateToChange[e.target.id] = e.target.value;
        this.setState(stateToChange)
    }

    constructNewTask = e => {
        e.preventDefault();
        if (this.state.taskName === '' || this.state.taskDate === '') {
            window.alert('Field is required')
        } else {
            this.setState({loadingStaus: true})
            const task = {
                userId: this.state.userId,
                task: this.state.task,
                date: this.state.date,
                completed: false,


            }
            console.log(task)
            APIManager.post(task, "tasks").then(() => this.props.history.push('/tasks'));
        }
    }

    render() {
        return(
            <>
            <form>
                <fieldset>
                    <div className='formgrid'>
                        <label htmlFor="task">Task</label>
                        <input type="text" required onChange={this.handleFieldChange} id="task"></input>
                    </div>
                    <div className='formgrid'>
                        <label htmlFor="date">Date</label>
                        <input type="date" required onChange={this.handleFieldChange} id="date"></input>
                    </div>
                    
                    <div>
                        <button type="button" disabled={this.state.loadingStaus}
                                              onClick={this.constructNewTask} >
                                Save
                        </button>
                    </div>
                </fieldset>
            </form>
            </>
        )

    }
}

export default TaskForm