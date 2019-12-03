import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Header from './components/common/Header';
import ProjectPage from './components/project/ProjectPage';
import AddTaskPage from './components/task/AddTask';
import ViewTask from './components/task/ViewTask';
import userPage from './components/user/User';

function App() {
  return (
    <div className="container-fluid">
      <h1> Project Management App </h1>
      <Header/>
      <Route exact path="/" component={userPage} />
      <Route path="/AddProject" component={ProjectPage} />
      <Route path="/AddTask" component={AddTaskPage} />
      <Route path="/AddUser" component={userPage} />
      <Route path="/ViewTask" component={ViewTask} />
    </div>
  );
}

export default App;
