import React, { useState } from 'react'
import Navbar from './layouts/Navbar'
//import Background from '../img/istockphoto-458085379-170667a.jpg'
import './styles/Signin.css'
import { EmailOutlined } from '@material-ui/icons'
import app from './config/Firebase'

function ForgotPassword(props) {
    /* Declaring input states */
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    /* Declaring input errors states */
    const [emailError, setEmailError] = useState('');
    const [messageError, setMessageError] = useState('');


    /* clearing inputs*/
    const clearInputs = () => {
        setEmail('');
        setMessage('');
    }

    /* clearing errors */
    const clearErrors = () => {
        setEmailError('');
        setMessageError('');
    }

    /* handling the password reset */
    const onPasswordReset = (e) => {
        clearInputs();
        clearErrors();
        e.preventDefault();
        try {
            app.auth().sendPasswordResetEmail(email);
            setMessage('Check your mail for further instructions.');
        } catch {
            setMessageError('Email not found.');
        }
        
    }

    return (
        <React.Fragment>
            <Navbar />
            <div className="signup" style={{
                backgroundColor: "#f5f5f5",
                height: "100vh",
                paddingTop: "50px"
            }}>
                <div className="mx-auto my-5 col-lg-4 col-md-6 col-sm-4">
                    <div className="card-body">
                        <h1 className="card-title text-center signup-title">Password Reset</h1>
                        {message && 
                            <div class="alert alert-success alert-dismissible fade show" role="alert">
                                <strong>{message}</strong>
                                <button style={{outline: "none"}} type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div> 
                        } 
                        {messageError && 
                            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                <strong>{messageError}</strong>
                                <button style={{outline: "none"}} type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        }
                        <div className="d-flex d-sm-flex flex-column justify-content-center">
                            <form className="form mx-4">
                                <div className="form-group">
                                    <EmailOutlined className="icon" />
                                    <input 
                                        type="email"
                                        required
                                        placeholder="Email"
                                        value={email}
                                        onChange={e => {
                                            setEmail(e.target.value)
                                        }}
                                        className="form-control"
                                    />
                                    <span className="error-message">{emailError}</span>
                                </div>
                                <button type="submit" onClick={onPasswordReset} className="btn-signup btn-block">Reset Password</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ForgotPassword
