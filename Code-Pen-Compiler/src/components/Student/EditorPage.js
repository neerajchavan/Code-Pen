import React, { useState, useEffect } from 'react';
import Editor from './Editor'
import useLocalStorage from '../../hooks/useLocalStorage'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import history from '../history';
import { Alert } from 'react-bootstrap';



export const EditorPage = ({ match }) => {

  const [html, setHtml] = useState('')
  const [css, setCss] = useState('')
  const [js, setJs] = useState('')
  const [srcDoc, setSrcDoc] = useState('')
  let userData = JSON.parse(localStorage.getItem("userData"));
  let studentId = userData.id;
  // let {assignmentId} = useParams();

  async function getCode() {
    
    let assignmentId = { id: parseInt(match.params.aId) };
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

  const saveButton = () => {
  
    let htmlData = html;
    let cssData = css;
    let jsData = js;
    let assignmentId = { id: parseInt(match.params.aId) };

    console.log("STUDENT ID : " + studentId)
    let student = { id: studentId }

    let submitCode = { html: htmlData, css: cssData, js: jsData, student, assignmentId };
    submitCode = JSON.stringify(submitCode);
    console.log("SEND CODE : " + submitCode);

    let userData = JSON.parse(localStorage.getItem("userData"));

    const header = {
      'Content-Type': 'application/json',
    }
    axios.post('http://localhost:8080/submit-code/', submitCode, { headers: header })
      .then(response => console.log(response))
      .catch(error => console.log(error));

    alert("Saved Successfully!")
  }


  let logout = () => {
    localStorage.removeItem("userData");
    history.push('/');
  }

  useEffect(() => {
    getCode();
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

        <Navbar.Text className="mr-4">
          <a href="" onClick={saveButton}><u className="h4">save</u></a>
        </Navbar.Text>

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


