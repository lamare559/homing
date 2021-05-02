import React, { useState } from "react";
import Navbar from "../layouts/Navbar";
//import Background from '../../img/city.jpg'
import "../styles/Signin.css";
import { Link, useHistory } from "react-router-dom";
import { EmailOutlined, VpnKey, PermIdentity } from "@material-ui/icons";
import app from "../config/Firebase";
import firebase from "firebase";

function Signup() {
  /* Declaring input states */
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useHistory("");

  /* Declaring input errors states */
  const [fullnameError, setFullnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  /* clearing inputs*/
  const clearInputs = () => {
    setFullname("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  /* clearing errors */
  const clearErrors = () => {
    setFullnameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
  };

  /* handling signin with facebook */
  const signinWithFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    app
      .auth()
      .signInWithPopup(provider)
      .then(async (userId) => {
        if (app.auth().currentUser) {
          userId = app.auth().currentUser.uid;
          const displayName = app.auth().currentUser.displayName;
          const photoURL = app.auth().currentUser.photoURL;
          const phone = app.auth().currentUser.phoneNumber;
          const email = app.auth().currentUser.email;
          if (userId) {
            await app
              .firestore()
              .doc("searchers/" + userId)
              .set({
                status: "searcher",
                displayName,
                photoURL,
                phone,
                email,
              });
          }
        }
        history.push("/searcher");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/account-exists-with-different-credential":
            setErrorMessage("User already exist with different credential!");
            break;
          case "auth/email-already-in-use":
            setErrorMessage("Email already in use");
            break;
          default:
        }
      });
  };

  /* handling signin with google */
  const signinWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    app
      .auth()
      .signInWithPopup(provider)
      .then(async (userId) => {
        if (app.auth().currentUser) {
          userId = app.auth().currentUser.uid;
          const displayName = app.auth().currentUser.displayName;
          const photoURL = app.auth().currentUser.photoURL;
          const phone = app.auth().currentUser.phoneNumber;
          const email = app.auth().currentUser.email;
          if (userId) {
            await app
              .firestore()
              .doc("searchers/" + userId)
              .set({
                status: "searcher",
                displayName,
                photoURL,
                phone,
                email,
              });
          }
        }
        history.push("/searcher");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/account-exists-with-different-credential":
            setErrorMessage("User already exist with different credential!");
            break;
          case "auth/email-already-in-use":
            setErrorMessage("Email already in use");
            break;
          default:
        }
      });
  };

  /* handling the signup */
  const onSignup = (e) => {
    clearInputs();
    clearErrors();
    e.preventDefault();
    /* verification of, if confirm password matches password */
    if (confirmPassword !== password) {
      setConfirmPasswordError("Confirm password does not match with password");
    }

    if (!e.target.value) {
      setFullnameError("Required");
      setEmailError("Required");
      setPasswordError("Required");
      setConfirmPasswordError("Required");
    }

    /* creating a new user */
    app
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        app.auth().currentUser.updateProfile({
          displayName: fullname,
        });
      })
      .then(async (userId) => {
        if (app.auth().currentUser) {
          userId = app.auth().currentUser.uid;
          if (userId) {
            await app
              .firestore()
              .doc("searchers/" + userId)
              .set({
                fullname,
                email,
                status: "searcher",
              });
          }
        }
        history.push("/signin");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            setEmailError("Email already in use");
            break;
          case "auth/invalid-email":
            setEmailError("Invalid email");
            break;
          case "auth/weak-password":
            setPasswordError("Weak password");
            break;
          default:
        }
      });
  };

  return (
    <React.Fragment>
      <Navbar />
      <div
        className="signup"
        style={{
          height: "120vh",
          backgroundColor: "#f5f5f5",
          paddingTop: "50px",
        }}
      >
        {errorMessage && (
          <div
            class="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            <strong>{errorMessage}</strong>
            <button
              style={{ outline: "none" }}
              type="button"
              class="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
        <div className="mx-auto my-5 col-lg-4 col-md-6 col-sm-4">
          <div className="card-body">
            <h1 className="card-title text-center signup-title">
              Sign Up - Searcher
            </h1>
            <div className="d-flex d-sm-flex flex-column justify-content-center">
              <form className="form mx-4">
                <div className="form-group">
                  <PermIdentity className="icon" />
                  <input
                    type="text"
                    required
                    placeholder="Fullname"
                    value={fullname}
                    onChange={(e) => {
                      setFullname(e.target.value);
                    }}
                    className="form-control"
                  />
                  <span className="error-message">{fullnameError}</span>
                </div>
                <div className="form-group">
                  <EmailOutlined className="icon" />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className="form-control"
                  />
                  <span className="error-message">{emailError}</span>
                </div>
                <div className="form-group">
                  <VpnKey className="icon" />
                  <input
                    type="password"
                    required
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    className="form-control"
                  />
                  <span className="error-message">{passwordError}</span>
                </div>
                <div className="form-group">
                  <VpnKey className="icon" />
                  <input
                    type="password"
                    required
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                    className="form-control"
                  />
                  <span className="error-message">{confirmPasswordError}</span>
                </div>
                <button
                  type="submit"
                  onClick={onSignup}
                  className="btn-signup btn-block"
                >
                  Signup
                </button>
                <p>
                  Already have an account?{" "}
                  <Link className="signup-link" to="/signin">
                    Sign In
                  </Link>
                </p>
                <p className="p-agent">
                  Are you an agent?{" "}
                  <Link className="signup-link" to="/agent-signup">
                    Sign Up
                  </Link>
                </p>
                <p className="p-proprietor">
                  Are you a proprietor?{" "}
                  <Link className="signup-link" to="/proprietor-signup">
                    Sign Up
                  </Link>
                </p>
                <p className="text-center or-text">OR</p>
                <button
                  type="submit"
                  onClick={signinWithGoogle}
                  className="btn-signin-google btn-block"
                >
                  Signup With Google
                </button>
                <button
                  type="submit"
                  onClick={signinWithFacebook}
                  className="btn-signin-facebook btn-block"
                >
                  Signup With Facebook
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Signup;
