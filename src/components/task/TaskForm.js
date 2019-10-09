import React, {Component} from 'react';
import APIManager from '../../modules/APIManager';

class TaskForm extends Component {
    render() {
        return(
            <form>
                <formGroup>
                    <Label for="taskName">Task:</Label>
                    <input type="text" id="taskName"></input>
                       
                    
                </formGroup>
            </form>
        )

    }
}