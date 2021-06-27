import { NavbarTeacher } from './NavbarTeacher';
import { ImUsers } from 'react-icons/im';
import React, { useState } from 'react'
import history from '../history'
import { Alert, Button } from 'react-bootstrap';
import axios from 'axios';



export const AddAssignment = () => {

    const [assignment, setAssignment] = useState('')
    const [endDate, setSubmissionDate] = useState('')
    const [websiteUrl, setWebsiteUrl] = useState('')
    const [totalMarks, setTotalMarks] = useState('');
    const [isErrorOccurred, setisErrorOccuered] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    let showAssignmentPage = () => {
        console.log("Show Assignment Page")
        history.push('/teacher')
    }

    async function addAssignment() {
        console.log("Add Assignment Clicked");
        let startDate = new Date().toISOString().slice(0, 10);
        let assignmentObj = { assignment, endDate, startDate, websiteUrl, totalMarks };
        assignmentObj = JSON.stringify(assignmentObj);
        console.log("DATA : " + assignmentObj);

        try {
            const response = await fetch('http://localhost:8080/assignment/add-assignment', {
                method: 'POST',
                body: assignmentObj,
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await response.json();

            console.log("RESPONSE STATUS : " + response.status);

            if (response.status === 201) {
                setIsAdded(true);
            }
            else {
                setisErrorOccuered(true);
            }
        }
        catch (error) {
            console.log("CATCH : " + error)
            setisErrorOccuered(true);
        }
    }

    return (
        <>

            <NavbarTeacher />
            <h2 className="text-center text-dark mt-5 mb-0 font-weight-bolder">Add Assignment</h2>


            <div className="container-fluid add-assignment-form-container">

                {isErrorOccurred &&
                    <div className="mb-5" style={{ width: "380px" }}>
                    <Alert variant="danger" onClose={() => setisErrorOccuered(false)} dismissible>
                        <Alert.Heading style={{ fontSize: "20px" }}>Something Went Wrong, Assignment Not Added!</Alert.Heading>
                    </Alert>
                    </div>
                }

                {isAdded &&
                    <div className="mb-5" style={{ width: "380px" }}>
                        <Alert variant="success" onClose={() => setIsAdded(false)} dismissible>
                            <Alert.Heading style={{ fontSize: "20px" }}>Added Successfully!</Alert.Heading>
                        </Alert>
                    </div>
                }

                <div className="form-box">

                    <div className="body-form">
                        <form>
                            <div className="input-group mt-5 mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i class="fa fa-user"></i></span>
                                </div>
                                <input type="text" className="form-control" placeholder="Assignment Name" onInput={e => setAssignment(e.target.value)} value={assignment} />
                            </div>

                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i class="fa fa-lock"></i></span>
                                </div>
                                <input type="date" className="form-control" placeholder="submission date" onInput={e => setSubmissionDate(e.target.value)} value={endDate} />
                            </div>

                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i class="fa fa-lock"></i></span>
                                </div>
                                <input type="text" className="form-control" placeholder="website-url" onInput={e => setWebsiteUrl(e.target.value)} value={websiteUrl} />
                            </div>

                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i class="fa fa-lock"></i></span>
                                </div>
                                <input type="number" className="form-control" placeholder="total marks" onInput={e => setTotalMarks(e.target.value)} value={totalMarks} />
                            </div>


                            <Button variant="btn btn-success" onClick={addAssignment}>Add Assignment</Button>
                            <Button variant="btn btn-danger ml-5" onClick={showAssignmentPage}>Back</Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}





