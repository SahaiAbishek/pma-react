import React from 'react';
import axios from 'axios';

class AddTaskPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taskObj: {
                parentId: "",
                projectId: "",
                task: "",
                startDate: "",
                endDate: "",
                priority: "",
                status: ""
            },
            parentTask: "",
            userFirstName: "",
            disabled: true
        }
    }

    handleProjectTextChange = event => {
        const taskObj = { ...this.state.taskObj, projectId: event.target.value };
        this.setState({ taskObj });
    }

    handleTaskChange = event => {
        const taskObj = { ...this.state.taskObj, task: event.target.value };
        this.setState({ taskObj });
    }

    handlePriorityChange = event => {
        const taskObj = { ...this.state.taskObj, priority: event.target.value };
        this.setState({ taskObj });
    }

    handleStartDateChange = event => {
        const taskObj = { ...this.state.taskObj, startDate: event.target.value };
        this.setState({ taskObj });
    }

    handleEndDateChange = event => {
        const taskObj = { ...this.state.taskObj, endDate: event.target.value };
        this.setState({ taskObj });
    }

    handleFirstNameChange = event => {
        // const taskObj = { ...this.state.taskObj, endDate: event.target.value };
        this.setState({ userFirstName: event.target.value });
    }

    handleToggle = event => {
        this.setState({
            disabled: !this.state.disabled
        });

    }

    handleSubmit = event => {
        event.preventDefault();
        // if (this.validateForm()) {
        axios({
            method: 'post',
            url: 'http://localhost:12345/projectManagementApp/tasks',
            data: this.state.taskObj,
        })
            .then((response) => {
                console.log("SUCCESS : " + response);
            })
            .catch(function (response) {
                console.log(response);
            });
        // }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <div className="row">
                        <div className="col-sm-1">
                            <label>Project</label>
                        </div>
                        <div className="col-sm-2">
                            <input type="text" name="projectText" value={this.state.projetName} onChange={this.handleProjectTextChange} />
                        </div>
                        <div className="col-sm-2">
                            <input type="button" value="Search" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-1">
                            <label>Task</label>
                        </div>
                        <div className="col-sm-2">
                            <input
                                type="text"
                                name="taskText"
                                onChange={this.handleTaskChange}
                                value={this.state.taskObj.task}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-1">
                        </div>
                        <div className="col-sm-2">
                            <input type="checkbox"
                                name="projectText"
                                value={this.state.projetName}
                                onChange={this.handleToggle}
                            />
                            <label>Parent Task</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-1">
                            <label>
                                Priority :
                    </label>
                        </div>
                        <div className="col-sm-2">
                            <input
                                id="typeinp"
                                type="range"
                                min="0" max="30"
                                value={this.state.taskObj.priority}
                                onChange={this.handlePriorityChange}
                                step="1"
                                disabled={(this.state.disabled) ? "disabled" : ""}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-1">
                            <label>Parent Task</label>
                        </div>
                        <div className="col-sm-2">
                            <input
                                type="text"
                                name="parentTaskText"
                                onChange={this.handlePriorityChange}
                                value={this.state.taskObj.parentId}
                                disabled={(this.state.disabled) ? "disabled" : ""}
                            />
                        </div>
                        <div className="col-sm-2">
                            <input type="button" value="Search"  disabled = {(this.state.disabled)? "disabled" : ""}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-1">
                            <label>Start Date</label>
                        </div>
                        <div className="col-sm-2">
                            <input
                                type="text"
                                name="textStartDate"
                                value={this.state.taskObj.startDate}
                                onChange={this.handleStartDateChange}
                                disabled={(this.state.disabled) ? "disabled" : ""}
                            />
                        </div>
                        <div className="col-sm-1">
                            <label>End Date</label>
                        </div>
                        <div className="col-sm-2">
                            <input
                                type="text"
                                name="textEndDate"
                                value={this.state.taskObj.endDate}
                                onChange={this.handleEndDateChange}
                                disabled={(this.state.disabled) ? "disabled" : ""}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-1">
                            <label>User</label>
                        </div>
                        <div className="col-sm-2">
                            <input
                                type="text"
                                name="textUser"
                                value={this.state.userFirstName}
                                onChange={this.handleFirstNameChange}
                                disabled={(this.state.disabled) ? "disabled" : ""}
                            />
                        </div>
                        <div className="col-sm-2">
                            <input type="button" value="Search"  disabled = {(this.state.disabled)? "disabled" : ""} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-1">
                        </div>
                        <div className="col-sm-1">
                            <input type="submit" value="Add" />
                        </div>
                        <div className="col-sm-1">
                            <input type="button" name="buttonReset" value="Reset" />
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default AddTaskPage;