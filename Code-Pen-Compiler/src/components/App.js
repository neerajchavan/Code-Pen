import React, { useState, useEffect } from 'react';
import Editor from './Editor'
import useLocalStorage from '../hooks/useLocalStorage'
import { Navbar } from './Navbar';
import axios from 'axios';
import { Login } from './Login';


function App() {
  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')

  const buttonClicked = () => {
      // Simple POST request with a JSON body using axios
      let htmlData = html;
      let cssData = css;
      let jsData = js;
      let submitCode = {html:htmlData, css:cssData, js:jsData};
      submitCode = JSON.stringify(submitCode);
      console.log("SEND CODE : "+submitCode);

      const header = {
        'Content-Type': 'application/json',
      }
      axios.post('http://localhost:8080/submit-code', submitCode, {headers:header})
          .then(response => console.log(response))
          .catch(error => console.log(error));
  }

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
      {/* <Login/> */}
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
      
      <input class="btn btn-info" onClick={buttonClicked} type="button" value="Submit Code"/>
    </>
  )
}

export default App;
