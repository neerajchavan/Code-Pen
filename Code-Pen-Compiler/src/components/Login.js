import { ImUsers } from 'react-icons/im';
import React from 'react'

export const Login = () => {
    return (
        <div>
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
                                <input type="email" className="form-control" placeholder="Username" />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i class="fa fa-lock"></i></span>
                                </div>
                                <input type="password" className="form-control" placeholder="Password" />
                            </div>
                            <div class="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i class="fa fa-lock"></i></span>
                                </div>
                                <select className="form-control" id="exampleFormControlSelect2">
                                    <option>ADMIN</option>
                                    <option>TEACHER</option>
                                    <option>STUDENT</option>
                                </select>
                            </div>

                            <button type="button" className="btn login-button mt-4 mb-4 btn-secondary btn-block">LOGIN</button>
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
        </div>
    )
}