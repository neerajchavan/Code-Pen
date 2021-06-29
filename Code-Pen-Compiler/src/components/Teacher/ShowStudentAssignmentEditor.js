import React, { useState, useEffect } from 'react';
import Editor from '../Student/Editor'
import useLocalStorage from '../../hooks/useLocalStorage'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import history from '../history';
import { Alert } from 'react-bootstrap';



export const ShowStudentAssignmentEditor = ({ match }) => {

  const [html, setHtml] = useState('')
  const [css, setCss] = useState('')
  const [js, setJs] = useState('')
  const [srcDoc, setSrcDoc] = useState('')
  let userData = JSON.parse(localStorage.getItem("userData"));
  let studentId = match.params.sId;
  let assiId = match.params.aId;

  async function getCode() {
    
    let assignmentId = { id: parseInt(assiId) };
    console.log("STUDENT ID : " + studentId)
    let student = { id: studentId }
    let sendBody = { student, assignmentId };
    
    sendBody = JSON.stringify(sendBody);
    console.log("SEND CODE : " + sendBody);

    try{
      const response = await fetch('http://localhost:8080/get-code', {
        method: 'POST',
        body: sendBody,
        headers: { 'Content-Type': 'application/json' }
      });

      console.log("RESPONSE : " + response)
      const json = await response.json();
      console.log("JSON : " + JSON.stringify(json))
      console.log("HTML :: " + json.html);

      console.log("RESPONSE STATUS : " + response.status);

      if (response.status == 200) {
         setHtml(json.html);
         setCss(json.css);
         setJs(json.js);
      }
    }
    catch(error){
      console.error("Exception Occurred At GetCode() " + error)
    }
  }

  let logout = () => {
    localStorage.removeItem("userData");
    history.push('/');
  }

  useEffect(() => {
    getCode();
    console.log("Student Id : "+studentId);
    console.log("Assignment Id : "+assiId);
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `)
    }, 250)

    return () => clearTimeout(timeout)
  }, [html, css, js])

  return (
    <>
      {/* <h1>ID : {match.params.aId}</h1> */}
      <Navbar>
        <Navbar.Brand href=""><strong>Student</strong></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-center">
          <Navbar.Text>
            Signed in as: <a href="">{userData.firstName + " " + userData.lastName}</a>
          </Navbar.Text>
        </Navbar.Collapse>

        <Navbar.Text>
          <a href="" onClick={logout}>logout</a>
        </Navbar.Text>

      </Navbar>

      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>

    </>
  )
}


