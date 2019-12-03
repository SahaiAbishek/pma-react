import React from 'react';
import axios from 'axios';

class ViewTask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projetName: "",
            project: {
                // projectId: "",
                project: "",
                startDate: "",
                endDate: "",
                priority: "0"
            },
            tasks: [],
            errors: {}
        }
    }

    componentDidMount() {
        axios.get('http://localhost:12345/projectManagementApp/tasks')
            .then(response => {
                const tasks = response.data;
                this.setState({ tasks });
                console.log(this.state.tasks);
            }).catch(function (error) {
                console.log("Resource not found");
            });
    }

    render() {
        return (
            <div>
                <div class="row">
                    <div class="col-sm-1">
                        <label>Project</label>
                    </div>
                    <div class="col-sm-2">
                        <input type="text" name="projectText" value={this.state.projetName} />
                    </div>
                    <div class="col-sm-2">
                        <input type="button" value="Search" />
                    </div>
                    <div class="col-sm-4">
                        <label>Sort Task By:</label>
                        <input type="button" value="Start Date" />
                        <input type="button" value="End Date" />
                        <input type="button" value="Priority" />
                        <input type="button" value="Completed" />
                    </div>
                </div>
                <div class="row">
                    <table className="table table-hover" >
                        <thead>
                            <tr>
                                <td>
                                    Task
                                </td>
                                <td>
                                    Parent
                                </td>
                                <td>
                                    Priority
                                </td>
                                <td>
                                    Start Date
                                </td>
                                <td>
                                    Start Date
                                </td>
                                <td>
                                   
                                </td>
                                <td>
                                   
                                </td>
                            </tr>
                        </thead>
                        <tbody >
                            {
                                this.state.tasks.map((item, i) => {
                                    return (

                                        <tr key={i} >
                                            <td >
                                                <input type="text" name="textTask" value={item.task} />
                                            </td>
                                            <td >
                                                <input type="text" name="textParentId" value={item.parentId} />
                                            </td>
                                            <td >
                                                <input type="text" name="textPriority" value={item.priority} />
                                            </td>
                                            <td >
                                                <input type="text" name="textstartDate" value={item.startDate} />
                                            </td>
                                            <td >
                                                <input type="text" name="textEndDate" value={item.endDate} />
                                            </td>
                                            <td >
                                                <input type="button" name="buttonEdit" value="Edit" />
                                            </td>
                                            <td >
                                                <input type="button" name="buttonEnd" value="End Task" />
                                            </td>
                                        </tr>
                                    )
                                }
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ViewTask;