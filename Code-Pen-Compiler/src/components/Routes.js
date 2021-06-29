import React, { Component } from 'react'
import { Route, Router, Switch } from 'react-router'
import { Login } from './Login'
import { Admin } from './Admin'
import { Teacher } from './Teacher/Teacher'
import { Student } from './Student/Student'
import { EditorPage } from './Student/EditorPage'
import { AddAssignment } from './Teacher/AddAssignment'
import history from './history'
import { ShowStudents } from './Teacher/ShowStudents'
import { ShowStudentAssignments } from './Teacher/ShowStudentAssignments'
import { ShowStudentAssignmentEditor } from './Teacher/ShowStudentAssignmentEditor'

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/admin" component={Admin} />
                <Route exact path="/teacher" component={Teacher} />
                <Route exact path="/teacher/add-assignment" component={AddAssignment} />
                <Route exact path="/teacher/show-students" component={ShowStudents} />
                <Route path="/student" component={Student} />

                <Route path="/editor-page/:aId" component={EditorPage}/>
                <Route path="/teacher/show-students-assignment/:aId/:fname/:lname" component={ShowStudentAssignments} />
                <Route path="/teacher/show-student-assignment/:aId/:sId" component={ShowStudentAssignmentEditor} />
            </Switch>
        </Router>
        )
    }
}
