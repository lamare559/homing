import React, {useState} from 'react'
import Navbar from '../layouts/Navbar'
//import Background from '../../img/city.jpg'
import '../styles/Signin.css'
import {Link, useHistory} from 'react-router-dom'
import {EmailOutlined, VpnKey} from '@material-ui/icons'
import '@fortawesome/fontawesome-free'
import app from '../config/Firebase'
import firebase from 'firebase';

function SigninProprietor() {
    /* declaring inputs and input errors states */
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const history = useHistory('');

    /* clearing inputs */
    const clearInputs = () => {
        setEmail('');
        setPassword('');
    }

    /* clearing errors */
    const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
    }

    /* handling signin with facebook */
    const signinWithFacebook = () => {
        const provider = new firebase.auth.FacebookAuthProvider();
        app.auth().signInWithPopup(provider).then(async (userId) => {
            if(app.auth().currentUser) {
                userId = app.auth().currentUser.uid;
                const displayName = app.auth().currentUser.displayName;
                const photoURL = app.auth().currentUser.photoURL;
                const phone = app.auth().currentUser.phoneNumber;
                const email = app.auth().currentUser.email
                if(userId) {
                    await app.firestore().doc('proprietors/' + userId).set({
                        status: "proprietor",
                        displayName,
                        photoURL,
                        phone,
                        email
                    })
                }
            }
            history.push("/proprietor")
        }).catch(error => {
            switch(error.code) {
                case "auth/account-exists-with-different-credential":
                    setErrorMessage("User already exist with different credential!");
                    break;
                case "auth/email-already-in-use":
                    setErrorMessage("Email already in use");
                    break;
                default:
            }
        })
    }

    /* handling signin with google */
    const signinWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        app.auth().signInWithPopup(provider).then(async (userId) => {
            if(app.auth().currentUser) {
                userId = app.auth().currentUser.uid;
                const displayName = app.auth().currentUser.displayName;
                const photoURL = app.auth().currentUser.photoURL;
                const phone = app.auth().currentUser.phoneNumber;
                const email = app.auth().currentUser.email
                if(userId) {
                    await app.firestore().doc('proprietors/' + userId).set({
                        status: "proprietor",
                        displayName,
                        photoURL,
                        phone,
                        email
                    })
                }
            }
            history.push("/proprietor")
        }).catch(error => {
            switch(error.code) {
                case "auth/account-exists-with-different-credential":
                    setErrorMessage("User already exist with different credential!");
                    break;
                case "auth/email-already-in-use":
                    setErrorMessage("Email already in use");
                    break;
                default:
            }
        })
    }

    /* handling signin */
    const onSignin = (e) => {
        clearInputs();
        clearErrors();
        e.preventDefault();
        if(e.target.value === "") {
            setEmailError("Required")
            setPasswordError("Required")
        }
        app.auth().signInWithEmailAndPassword(email, password).then(() => {
            console.log("logged in")
            history.push("/proprietor");
        })
            .catch(error => {
                switch(error.code) {
                    case "auth/invalid-email":
                        setEmailError("Invalid email");
                        break;
                    case "auth/user-disabled":
                        setEmailError("User disabled");
                        break;
                    case "auth/user-not-found":
                        setEmailError("User not found");
                        break;
                    case "auth/account-exists-with-different-credential":
                        setEmailError("User already exists with different credential");
                        break;
                    case "auth/wrong-password":
                        setPasswordError("Incorrect password");
                        break;
                    default:
                }
            })
    }
    
    return (
        <React.Fragment>
            <Navbar />
            <div class="sigin" style={{
                backgroundColor: "#f5f5f5",
                height: "100vh",
                paddingTop: "50px"
            }}>
                {errorMessage && 
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>{errorMessage}</strong>
                        <button style={{outline: "none"}} type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div> 
                }
                <div className="mx-auto my-5 col-lg-4 col-md-6 col-sm-4">
                    <div className="card-body">
                        <h1 className="card-title text-center signin-title">Sign In - Proprietor</h1>
                        <div className="d-flex d-sm-flex flex-column justify-content-center">
                            <form className="form mx-4">
                                <div className="form-group">
                                    <EmailOutlined className="icon" />
                                    <input 
                                        type="email" 
                                        required
                                        value={email} 
                                        onChange={e => {
                                            setEmail(e.target.value)
                                        }}
                                        placeholder="Email" 
                                        className="form-control"
                                    />
                                    <span className="error-message">{emailError}</span>
                                </div>
                                <div className="form-group">
                                    <VpnKey className="icon" />
                                    <input 
                                        type="password" 
                                        value={password} 
                                        onChange={e => {
                                            setPassword(e.target.value)
                                        }} 
                                        required 
                                        placeholder="Password" 
                                        className="form-control"
                                    />
                                    <span className="error-message">{passwordError}</span>
                                </div>
                                <button type="submit" onClick={onSignin} className="btn-signin btn-block">Signin</button>
                                <Link to="forgot-password" className="forgot-password">Forgot password?</Link>
                                <p>Don't have an account? <Link className="signup-link" to="/proprietor-signup">Sign Up</Link></p>
                                <p className="p-agent">Are you an agent? <Link className="signup-link-agent" to="/agent-signup">Sign Up</Link></p>
                                <p className="text-center or-text">OR</p>
                                <button type="submit" onClick={signinWithGoogle} className="btn-signin-google btn-block">Signin With Google</button>
                                <button type="submit" onClick={signinWithFacebook} className="btn-signin-facebook btn-block">Signin With Facebook</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default SigninProprietor
