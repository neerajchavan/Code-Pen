import React from 'react';
import { Login } from './Login';
import Routes from './Routes';
import { BrowserRouter as Router } from 'react-router-dom';


export default function App() {

  return (
    <>
      <Router>
        <Routes />
      </Router>
    </>
  )
}

