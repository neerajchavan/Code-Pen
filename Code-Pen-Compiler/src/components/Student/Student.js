import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { NavbarStudent } from './NavbarStudent';
import { Button } from 'react-bootstrap';
import history from '../history'
import { EditorPage } from './EditorPage';
import { render } from '@testing-library/react';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export const Student = () => {

  const classes = useStyles();
  let [rows, setRows] = useState([]);
  let assignmentCounter = 1;

  useEffect(() => {
    getRowData();

  }, [])

  async function getRowData() {
    try {
      const response = await fetch('http://localhost:8080/assignment/', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      console.log("RESPONSE : " + response)
      const json = await response.json();
      console.log("JSON : " + JSON.stringify(json))

      console.log("RESPONSE STATUS : " + response.status);

      if (response.status == 200) {
        let rowCopy = [];
        json.map(item => rowCopy.push(item));
        setRows(rowCopy);
        console.log(rows);
      }
    }
    catch (error) {
      console.log("CATCH : " + error)
    }
  }

  async function passDataToEditorPage() {
    try {
      const response = await fetch('http://localhost:8080/assignment/', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      console.log("RESPONSE : " + response)
      const json = await response.json();
      console.log("JSON : " + JSON.stringify(json))

      console.log("RESPONSE STATUS : " + response.status);

      if (response.status == 200) {
        let rowCopy = [];
        json.map(item => rowCopy.push(item));
        setRows(rowCopy);
        console.log(rows);
      }
    }
    catch (error) {
      console.log("CATCH : " + error)
    }
  }

  let showAddAssignmnet = () => {
    console.log("Add Assignment Clicked")
    history.push('/teacher/add-assignment')
  }

  let showAssignmnet = () => {
    console.log("Show Assignment Clicked")
    history.push('/teacher')
  }

  let goToEditorPage = (id) => {
      console.log("Go To Code Editor Page")
      console.log(id)
      let assignmentId = id;
      history.push(`/editor-page/${assignmentId}`);
  }

  return (
    <>
      <NavbarStudent />
      <h2 className="text-center text-dark m-5 font-weight-bolder">Show Assignment</h2>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell algin="left">Assignment</TableCell>
              <TableCell algin="left">Total Marks</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Submission Date</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Playground</TableCell>
            </TableRow>
          </TableHead>
          {console.log("Table Head : " + rows)}
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{assignmentCounter++}</TableCell>
                <TableCell component="th" scope="row">
                  {row.assignment}
                </TableCell>
                <TableCell>{row.totalMarks}</TableCell>
                <TableCell>{row.startDate}</TableCell>
                <TableCell>{row.endDate}</TableCell>
                <TableCell><a href={row.websiteUrl}>demo</a></TableCell>
                <TableCell><a href="" onClick={() => {goToEditorPage(row.id)}}>click to code</a></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="text-center">
        <Button className="m-5" variant="btn btn-warning" onClick={showAssignmnet}>Show Assignment</Button>
        <Button className="m-5" variant="btn btn-secondary" onClick={showAddAssignmnet}>Add Assignment</Button>
      </div>
    </>
  );
}
