import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const activeStyle = { color: "#F15B2A" };

    return (
        <nav >
            <NavLink to="/AddProject" activeStyle={activeStyle} exact>Add Project</NavLink>{" | "}
            <NavLink to="/AddTask" activeStyle={activeStyle} exact>Add Task</NavLink>{" | "}
            <NavLink to="/AddUser" activeStyle={activeStyle} exact>Add User</NavLink>{" | "}
            <NavLink to="/ViewTask" activeStyle={activeStyle} exact>View Task</NavLink>
        </nav>
    )
}

export default Header;