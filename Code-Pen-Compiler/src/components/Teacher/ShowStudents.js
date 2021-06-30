import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { NavbarTeacher } from './NavbarTeacher';
import { Button } from 'react-bootstrap';
import history from '../history'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export const ShowStudents = () => {

  const classes = useStyles();
  let [rows, setRows] = useState([]);
  let userData = JSON.parse(localStorage.getItem("userData"));
  let teacherId = parseInt(userData.id);
  let assignmentCounter = 1;

  useEffect(() => {
    getRowData();
  }, [])

  async function getRowData() {
    try {
      const response = await fetch(`http://localhost:8080/student`,{
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

  async function viewStudentAssignments(sId,firstName,lastName){
      console.log("STUDENT ID : "+sId)
      history.push(`/teacher/show-students-assignment/${sId}/${firstName}/${lastName}`)
  }

  let showAssignmnet = () => {
    console.log("Show Assignment Clicked")
    history.push('/teacher')
  }

  let showStudentList = () => {
    console.log("Show Students List Clicked")
    history.push("/teacher/show-students")
  }

  let showAddAssignmnet = () => {
    console.log("Add Assignment Clicked")
    history.push('/teacher/add-assignment')
  }

  return (
    <>
      <NavbarTeacher />
      <h2 className="text-center text-dark m-5 font-weight-bolder">Student List</h2>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell align="center">Student Name</TableCell>
              <TableCell align="center">Email Address</TableCell>
              <TableCell align="center">Phone No</TableCell>
              <TableCell align="center">View Assignments</TableCell>
            </TableRow>
          </TableHead>
          {console.log("Table Head : " + rows)}
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{assignmentCounter++}</TableCell>
                <TableCell align="center" component="th" scope="row">
                  {row.firstName + " " + row.lastName}
                </TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.phoneNo}</TableCell>
                <TableCell align="center"><a href="" onClick={() => {viewStudentAssignments(row.id, row.firstName, row.lastName)}}>view</a></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="text-center">
        <Button className="m-5" variant="btn btn-success" onClick={showStudentList}>Show Students</Button>
        <Button className="m-5" variant="btn btn-secondary" onClick={showAddAssignmnet}>Add Assignment</Button>
        <Button className="m-5" variant="btn btn-warning" onClick={showAssignmnet}>Show Assignment</Button>
      </div>
    </>
  );
}
