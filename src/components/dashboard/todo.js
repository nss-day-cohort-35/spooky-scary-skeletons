import React, {Component} from 'react';
import APIManager from '../../modules/APIManager';
import {Table} from 'reactstrap'



class ToDo extends Component {
    state = {
        tasks: [],
        unfinishedTasks: [],
    };

    getData = () => {
        APIManager.getAll("tasks").then((task) => {
            this.setState({
                tasks: task
            })
            this.setState({
                unfinishedTasks: task.filter(t => t.completed === false)
            })
        })
    }


    componentDidMount(){
         this.getData()
    }

    
    render() {
        console.log('TASK LIST: Render');
        return(
            <>
            
            {this.state.unfinishedTasks.map(task => (
                <Table striped hover size="sm">
                    <tr>
                        <td>{task.task}</td>
                        <td>{task.date}</td>
                    </tr>
                 </Table>
                ))}
           
            </>
        )
    }
}

export default ToDo;