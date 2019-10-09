import React, {Component} from 'react'
import APIManager from '../../modules/APIManager'

class TaskEditForm extends Component{
    state = {
        userId: localStorage.id,
        task: "",
        completeDate: "",
        completed: false,
        loadingStaus: true
    }

    handleFieldChange = e => {
        const stateToChange = {}
        stateToChange[e.target.id] = e.target.value
        this.setState(stateToChange)
    }

    
    componentDidMount(){
        APIManager.getAll().then(tasks => {
            APIManager.get(this.props.match.params.tasks.id)
            .then(task => {
                this.setState({
                    task: task,
                    completeDate: date

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
                        <input type="text" required onChange= {this.handleFieldChange} id="taskName"
                        ></input>
                    </div>
                    <div className='formgrid'>
                        <label for="taskDate">Date</label>
                        <input type="date" required onChange= {this.handleFieldChange} id="taskDate"></input>
                    </div>
                    <div>
                        <button type="button" disabled={this.state.loadingStaus}
                                              onClick={this.constructNewTask} >
                                Save
                        </button>
                    </div>
                </fieldset>
            </form>
        )
    }
}