import React from 'react'
import { Navbar } from 'react-bootstrap';
import history from '../history';

export const NavbarEditor = (props) => {


    let logout = () => {
        localStorage.removeItem("userData");
        history.push('/');
    }

    return (
        <div>
            <Navbar>
                <Navbar.Brand href="">Student</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-center">
                    <Navbar.Text>
                        Signed in as: <a href="">{props.firstName + " " + props.lastName}</a>
                    </Navbar.Text>
                </Navbar.Collapse>

                
                    <Navbar.Text>
                       <a href="" onClick={logout}>logout</a>
                    </Navbar.Text>

                    <Navbar.Text>
                       <a href="" onClick={props.save}>save</a>
                    </Navbar.Text>
                
            </Navbar>
        </div>
    )
}
