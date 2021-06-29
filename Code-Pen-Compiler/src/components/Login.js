import { ImUsers } from 'react-icons/im';
import React, { useState } from 'react'
import history from './history'
import { Alert, Button } from 'react-bootstrap';
import axios from 'axios';



export const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userType, setUserType] = useState('STUDENT')
    const [isErrorOccuered, setisErrorOccuered] = useState(false);

    async function loginClickedFetch() {
        console.log("login clicked fetch");
        let credentials = { email, password };
        credentials = JSON.stringify(credentials);
        console.log("CREDENTIALS : "+credentials);

        let endpoint = "";
        console.log("USER TYPE : "+ userType);
        if(userType == 'ADMIN') endpoint = 'admin';
        else if (userType == 'TEACHER') endpoint = 'teacher';
        else if (userType == 'STUDENT') endpoint = 'student';

        console.log("ENDPOINT : "+endpoint);

        try {
            const response = await fetch('http://localhost:8080/login/'+endpoint, {
                method: 'POST',
                body: credentials,
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await response.json();
            localStorage.setItem("userData",JSON.stringify(data));
            console.log("RESPONSE STATUS : "+response.status);
            if(response.status === 200)
            {
                if(endpoint == 'admin') history.push('/admin');
                else if(endpoint == 'teacher') history.push('/teacher');
                else if(endpoint == 'student') history.push('/student');
                let localData = JSON.parse(localStorage.getItem("userData"));
                console.log("Local Storage : "+localData.email);
            }

            else{
                setisErrorOccuered(true);
            }
        }
        catch (error) {
            console.log("CATCH : "+error)
            setisErrorOccuered(true);
        }

    }

    let userTypeClicked = (e) => {
        console.log("User type clicked " + e.target.value);
        setUserType(e.target.value);
    }

    return (
        <>
            {isErrorOccuered &&

                <Alert variant="danger" onClose={() => setisErrorOccuered(false)} dismissible>
                    <Alert.Heading>Invalid Username/Password!</Alert.Heading>
                </Alert>
            }


            <div className="container">
                <div className="form-box">
                    <div className="header-form">
                        <h1 className="text-info text-center">Welcome User</h1>
                        <ImUsers size="4em" color="white" style={{ marginLeft: "40%" }} />
                    </div>

                    <div className="body-form">
                        <form>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i class="fa fa-user"></i></span>
                                </div>
                                <input type="email" className="form-control" placeholder="Username" onInput={e => setEmail(e.target.value)} value={email} />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i class="fa fa-lock"></i></span>
                                </div>
                                <input type="password" className="form-control" placeholder="Password" onInput={e => setPassword(e.target.value)} value={password} />
                            </div>
                            <div class="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i class="fa fa-lock"></i></span>
                                </div>
                                <select value={userType} onChange={userTypeClicked} className="form-control" id="exampleFormControlSelect2">
                                    <option>TEACHER</option>
                                    <option>STUDENT</option>
                                </select>
                            </div>

                            <Button variant="btn btn-success" onClick={loginClickedFetch}>LOGIN</Button>

                            <div className="message">
                                <div><input type="checkbox" /> Remember ME</div>
                                <div><a href="#">Forgot your password</a></div>
                            </div>
                        </form>
                        <div className="social">
                            <a href="#"><i className="fab fa-facebook"></i></a>
                            <a href="#"><i className="fab fa-twitter-square"></i></a>
                            <a href="#"><i className="fab fa-google"></i></a>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}