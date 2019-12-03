import React from 'react';
import axios from 'axios';

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstName: "",
                lastName: "",
                employeeId: "",
                projectId: "1",
                taskId: "1"
            },
            users: [],
            errors: {}
        };
    }

    componentDidMount() {
        axios.get('http://localhost:12345/projectManagementApp/users')
            .then(response => {
                const users = response.data;
                this.setState({ users });
                console.log(this.state.users);
            }).catch(function (error) {
                console.log("Resource not found");
            });
    }

    handleFirstNameChange = event => {
        const user = { ...this.state.user, firstName: event.target.value };
        this.setState({ user });
    }

    handleLastNameChange = event => {
        const user = { ...this.state.user, lastName: event.target.value };
        this.setState({ user });
    }

    handleEmpIdChange = event => {
        const user = { ...this.state.user, employeeId: event.target.value };
        this.setState({ user });
    }

    validateForm() {
        let errors = {};
        let formIsValid = true;

        if (this.state.user.firstName.length <= 0) {
            formIsValid = false;
            errors["fName"] = "*Please enter your First Name.";
        }
        if (this.state.user.lastName.length <= 0) {
            formIsValid = false;
            errors["lName"] = "*Please enter your Last Name.";
        }
        if (this.state.user.employeeId.length <= 0) {
            formIsValid = false;
            errors["empId"] = "*Please enter your Employee ID.";
        }
        this.setState({
            errors: errors
        });
        return formIsValid;
    }

    addUser = event => {
        event.preventDefault();
        if (this.validateForm()) {
            axios({
                method: 'post',
                url: 'http://localhost:12345/projectManagementApp/users',
                data: this.state.user,
            })
                .then((response) => {
                    console.log("SUCCESS : " + response);
                })
                .catch(function (response) {
                    console.log(response);
                });
        }
    }

    render() {
        return (
            <div>
                <h2> User Page </h2>
                <form onSubmit={this.addUser}>
                    <div>
                        <label>
                            First Name:
                            <input
                                type="text"
                                name="firstName"
                                onChange={this.handleFirstNameChange}
                                value={this.state.user.firstName}
                            />
                        </label>
                        <div className="errorMsg">{this.state.errors.fName}</div>
                    </div>
                    <div>
                        <label>
                            Last Name:
                            <input
                                type="text"
                                name="lastName"
                                onChange={this.handleLastNameChange}
                                value={this.state.user.lastName}
                            />
                        </label>
                        <div className="errorMsg">{this.state.errors.lName}</div>
                    </div>
                    <div>
                        <label>
                            Employee ID:
                            <input
                                type="text"
                                name="empId"
                                onChange={this.handleEmpIdChange}
                                value={this.state.user.empId}
                            />
                        </label>
                        <div className="errorMsg">{this.state.errors.empId}</div>
                    </div>
                    <input type="submit" value="Add" />
                    <input type="button" value="reset" />
                </form>
                <br></br>
                <p>
                    <input type="text" placeholder="serach" />
                    <label> sort: </label>
                    <input type="button" value="First Name" />
                    <input type="button" value="Last Name" />
                    <input type="button" value="ID" />
                </p>

                <table className="table table-hover" >
                    <tbody >
                        {
                            this.state.users.map((item, i) => {
                                return (

                                    <tr key={i} >
                                        <td >
                                            <input type="text" name="fName" value={item.firstName} onChange={this.handleEmpIdChange} />
                                            <input type="button" value="Edit" />
                                            <br></br>
                                            <input type="text" value={item.lastName} onChange={this.handleEmpIdChange} />
                                            <input type="button" value="Delete" />
                                            <br></br>
                                            <input type="text" value={item.employeeId} onChange={this.handleEmpIdChange} />
                                        </td>
                                    </tr>
                                )
                            }
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}


export default User;