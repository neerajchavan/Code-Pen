import React, { Component } from 'react'
import { Route, Router, Switch } from 'react-router'
import { Login } from './Login'
import { Admin } from './Admin'
import { Teacher } from './Teacher/Teacher'
import { Student } from './Student/Student'
import { EditorPage } from './Student/EditorPage'
import { AddAssignment } from './Teacher/AddAssignment'
import history from './history'

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/admin" component={Admin} />
                <Route exact path="/teacher" component={Teacher} />
                <Route exact path="/teacher/add-assignment" component={AddAssignment} />
                <Route path="/student" component={Student} />

                <Route path="/editor-page/:aId" component={EditorPage}/>
            </Switch>
        </Router>
        )
    }
}
