import React, {Component} from 'react';


class TaskList extends Component {
    state = {
        tasks: []
    };

    componentDidMount(){
        APIManager.getAll("tasks").then((task) => {
            this.setState({
                tasks: task
            })
        })
    }


    render() {
        return(
            <div>
                {this.state.tasks.map(task => (
                    <TaskCard key = {task.id}
                              task = {task}
                    />
                ))}
            </div>
        )
    }
}