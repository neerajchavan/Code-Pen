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
import { useParams } from 'react-router';
import { ShowStudentAssignmentEditor } from './ShowStudentAssignmentEditor';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export const ShowStudentAssignments = (props) => {

  const classes = useStyles();
  let [rows, setRows] = useState([]);
  let userData = JSON.parse(localStorage.getItem("userData"));
  let teacherId = parseInt(userData.id);
  let assignmentCounter = 1;
  let studentId = props.match.params.aId;
  let studentName = props.match.params.fname + " " + props.match.params.lname;
  let [studentMarks, setStudentMarks] = useState([]);

  useEffect(() => {
    getRowData();
    // getMarks();
    // console.log("PROPS : "+props.match.params.aId);
    // console.log("PROPS : "+JSON.stringify(props));
    console.log("USE EFFECT OVER");
  }, [])

  async function getRowData() {
    console.log("TEACHER ID : "+teacherId);
    try {
      const response = await fetch(`http://localhost:8080/assignment/`+teacherId, {
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

  async function getMarks() {
    
    let student = { id: studentId }
    let sendBody = { student};
    
    sendBody = JSON.stringify(sendBody);
    console.log("SEND CODE : " + sendBody);

    try{
      const response = await fetch('http://localhost:8080/get-marks', {
        method: 'POST',
        body: sendBody,
        headers: { 'Content-Type': 'application/json' }
      });

      console.log("RESPONSE : " + response)
      const json = await response.json();
      console.log("JSON : " + JSON.stringify(json))

      console.log("RESPONSE STATUS : " + response.status);

      if (response.status == 200) {
        console.log("Recived Student Marks")
        let codeCopy = [];
        json.map(item => codeCopy.push(item));
        setStudentMarks(codeCopy);
        console.log(studentMarks);
      }
    }
    catch(error){
      console.error("Exception Occurred At GetCode() " + error)
    }
  }

  async function addingRecievedMarksInRows(){
    console.log("ROWS LENGTH : "+rows.length)
    let i;
     for(i=0; i<rows.length; i++){
      console.log("PRINT"+rows[i]);
       rows[i].recivedMarks = 30;
     }

     console.log("AFTER ADDING MARKS : " + JSON.stringify(rows))
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

  let showStudentAssignmentEditor = (assignmentId, studentId) => {
      console.log(`Showing Assignment ${assignmentId} of Student ${studentId}`)
      history.push(`/teacher/show-student-assignment/${assignmentId}/${studentId}`)
  }

  return (
    <>
      <NavbarTeacher />
      {studentMarks.map(item => console.log("STUDENT OBJJJJJJ : "+item.recievedMarks))}
      <h2 className="text-center text-dark m-5 font-weight-bolder">{studentName}'s Assignments</h2>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell align="center">Assignment</TableCell>
              <TableCell align="center">Total Marks</TableCell>
              <TableCell align="center">Created Date</TableCell>
              <TableCell align="center">Submission Date</TableCell>
              <TableCell align="center">Details</TableCell>
              <TableCell align="center">View Student's Assignment</TableCell>
            </TableRow>
          </TableHead>
          {console.log("Table Head : " + rows)}
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{assignmentCounter++}</TableCell>
                <TableCell align="center">{row.assignment}</TableCell>
                <TableCell align="center">{row.totalMarks}</TableCell>
                <TableCell align="center">{row.startDate}</TableCell>
                <TableCell align="center">{row.endDate}</TableCell>
                <TableCell align="center"><a href={row.websiteUrl}>demo</a></TableCell>
                <TableCell align="center"><a href="" onClick={() => {showStudentAssignmentEditor(row.id, studentId)}}>view assignment</a></TableCell>     
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="text-center">
        <Button className="m-5" variant="btn btn-secondary" onClick={showStudentList}>Back</Button>
      </div>
    </>
  );
}
