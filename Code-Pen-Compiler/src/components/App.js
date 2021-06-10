import React, { useState, useEffect } from 'react';
import Editor from './Editor'
import useLocalStorage from '../hooks/useLocalStorage'
import { Navbar } from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


function App() {
  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')

  const buttonClicked = () => {
      // Simple POST request with a JSON body using axios
      let htmlData = html;
      const sendHtml = [htmlData, css, js];
      console.log("SEND HTML : "+sendHtml);
      axios.post('http://localhost:8080/getsrc', sendHtml)
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
      <Navbar/>
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
      <div>
        <input type="button" value="Send Data" onClick={buttonClicked}/>
      </div>
    </>
  )
}

export default App;
