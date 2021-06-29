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

        </div>
    )
}
