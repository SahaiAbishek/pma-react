import React from 'react';
import axios from 'axios';

class ProjectPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            userId: "",
            projectObj: {
                // projectId: "",
                project: "",
                startDate: "",
                endDate: "",
                priority: "0"
            },
            managerObj: {
                userId: "",
                firstName: "",
                lastName: "",
                employeeId: "",
                projectId: "",
                taskId: ""
            },
            projects: [],
            errors: {},
            disabled:true
        };
    }

    componentDidMount() {
        axios.get('http://localhost:12345/projectManagementApp/projects')
            .then(response => {
                const projects = response.data;
                this.setState({ projects });
            }).catch(function (error) {
                console.log("Resource not found");
            });
    }

    handleProjectChange = event => {
        const projectObj = { ...this.state.projectObj, project: event.target.value };
        this.setState({ projectObj });
    }

    handleStartDateChange = event => {
        const projectObj = { ...this.state.projectObj, startDate: event.target.value };
        this.setState({ projectObj });
    }

    handleEndDateChange = event => {
        const projectObj = { ...this.state.projectObj, endDate: event.target.value };
        this.setState({ projectObj });
    }

    handleToggleDates = event => {
        this.setState({
            checked: event.target.checked,
            disabled: !this.state.disabled
        });
        
    }

    handlePriorityChange = event => {
        const projectObj = { ...this.state.projectObj, priority: event.target.value };
        this.setState({ projectObj });
    }

    handleManagerChange = event => {
        const managerObj = { ...this.state.managerObj, firstName: event.target.value };
        this.setState({ managerObj });
    }

    handleChange = event => {
        this.setState({ value: event.target.value });
    }

    searchManager = event => {
        event.preventDefault();
        axios.get(`http://localhost:12345/projectManagementApp/users/first-name/` + this.state.managerObj.firstName)
            .then(response => {
                const items = response.data;
                var managerObj = items[0];
                this.setState({ managerObj });
                console.log(this.state.managerObj);
            }).catch(function (error) {
                console.log("Resource not found");
            });
    }

    addProject = event => {
        event.preventDefault();
        // if (this.validateForm()) {
        axios({
            method: 'post',
            url: 'http://localhost:12345/projectManagementApp/projects',
            data: this.state.projectObj,
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
            <div>
                <form onSubmit={this.addProject}>
                    <div>
                        <label>
                            Project:
                            <input
                                type="text"
                                name="project"
                                onChange={this.handleProjectChange}
                                value={this.state.projectObj.project}
                            />
                        </label>
                        {/* <div className="errorMsg">{this.state.errors.fName}</div> */}
                    </div>
                    <div>
                        <label>
                            Set Start and End Date:
                        <input
                                type="checkbox"
                                name="setDates"
                                onChange={this.handleToggleDates}
                                checked={this.state.checked}
                            />
                        </label>
                        <input
                            type="text"
                            name="startDate"
                            placeholder="Start Date"
                            onChange={this.handleStartDateChange}
                            value={this.state.projectObj.startDate}
                            disabled = {(this.state.disabled)? "disabled" : ""}
                        />
                        <input
                            type="text"
                            name="endDate"
                            placeholder="End Date"
                            onChange={this.handleEndDateChange}
                            value={this.state.projectObj.endDate}
                            disabled = {(this.state.disabled)? "disabled" : ""}
                        />
                    </div>
                    <div>
                        <label>
                            Priority :
                            <input
                                id="typeinp"
                                type="range"
                                min="0" max="30"
                                value={this.state.projectObj.priority}
                                onChange={this.handlePriorityChange}
                                step="1" />
                        </label>
                    </div>
                    <div>
                        <label>
                            Manager:
                            <input
                                type="text"
                                name="manager"
                                onChange={this.handleManagerChange}
                                value={this.state.managerObj.firstName}
                            />
                            <input type="button" name="search" value="search" onClick={this.searchManager} />
                        </label>
                        {/* <div className="errorMsg">{this.state.errors.fName}</div> */}
                    </div>
                    <div>
                        <input type="submit" value="Add" />
                        <input type="button" value="reset" />
                    </div>
                </form>
                <table className="table table-hover" >
                    <tbody >
                        {
                            this.state.projects.map((item, i) => {
                                return (

                                    <tr key={i} >
                                        <td >
                                            <input type="text" name="project" value={item.project} onChange={this.handleProjectChange} />
                                            <input type="button" value="Edit" />
                                            <br></br>
                                            <input type="text" name="startDate" value={item.startDate} onChange={this.handleStartDateChange} />
                                            <input type="button" value="Delete" />
                                            <br></br>
                                            <input type="text" name="endDate" value={item.endDate} onChange={this.handleEndDateChange} />
                                            <br></br>
                                            <input type="text" name="tasks" />
                                            <br></br>
                                            <input type="text" name="completed" />
                                        </td>
                                    </tr>
                                )
                            }
                            )
                        }
                    </tbody>
                </table>
            </div>

        );
    }


}

export default ProjectPage;