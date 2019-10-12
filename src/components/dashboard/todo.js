import React, {Component} from 'react';
import APIManager from '../../modules/APIManager';
import {Table} from 'reactstrap'
import moment from "moment";



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
             <Table striped hover size="sm">
                 <tbody>
            {this.state.unfinishedTasks.map(task => (
               
                    <tr key={task.id}>
                        <td>{task.task}</td>
                        <td>{moment(task.date).format("ll")}</td>
                    </tr>
                 
                ))}
                </tbody>
            </Table>
            </>
        )
    }
}

export default ToDo;