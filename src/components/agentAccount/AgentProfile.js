import React, {useEffect, useState} from 'react'
import AgentNavbar from '../layouts/AgentNavbar'
import app from '../config/Firebase'
import {Link} from 'react-router-dom'
import {InsertPhoto} from '@material-ui/icons'
import '../styles/Account.css'

function AgentProfile() {
    const [personInfo, setPersonInfo] = useState('');
    const [image, setImage] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');
    const types = ["image/png", "image/jpeg", "image/jpg"];
    const photoUrl = app.auth().currentUser.photoURL;
    //const history = useHistory('');

    const onFileChange = async (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            if (types.includes(selectedFile.type)) {
                setError('');
                setImage(selectedFile);
                console.log(selectedFile);
            } else {
                setImage('');
                setError("Please select an image file (png or jpg)");
            }
        }

        /* Uploading image to firebase (storage and firestore) */

        /* to firebase storage */
        const storageRef = app.storage().ref("profilePicture").child(image.name)
        await storageRef.put(image)
        storageRef.getDownloadURL().then((url) => {
            setImageUrl(url)
        })

        /* to firestore */
        await app.auth().currentUser.updateProfile({
            photoURL: imageUrl
        }).then(async () => {
            await app.firestore().collection("agents").doc(app.auth().currentUser.uid).set({
                photoURL: imageUrl
            })
        }).catch(() => {
            setError("Something went wrong")
        })
    }

    

    const getUserInfo = async () => {
        await app.firestore().collection("agents").doc(app.auth().currentUser.uid).get()
            .then((snapshot) => {
                setPersonInfo(snapshot.data())
            })
    }

    useEffect(() => {
        getUserInfo();
    })
    return (
        <>
          <AgentNavbar />
          <div className="container" style={{
              paddingTop: "80px"
          }}>
            <p>Account - Account Profile</p>
            <h2>Account Profile</h2>
            {error && 
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>{error}</strong>
                    <button style={{outline: "none"}} type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div> 
            }
            <div className="row py-4">
                <div className="col-lg-6 col-md-6">
                    {photoUrl ? (
                        <div className="justify-content-center">
                            <img 
                                src={photoUrl || personInfo.photoURL} 
                                width="100" 
                                height="100" 
                                alt="avatar" 
                                className="rounded-circle mb-3"
                            />
                            <h3>Profile Picture</h3>
                        </div>
                    ) : (
                        <div className="justify-content-center">
                            <img 
                                src="https://a0.muscache.com/defaults/user_pic-50x50.png?v=3" 
                                alt="avatar" 
                                width="100" 
                                height="100"
                                className="rounded-circle mb-3"
                            />
                            <h3>Profile Picture</h3>
                        </div>
                    )}
                    <label>
                        <input type="file" className="file" onChange={onFileChange}/>
                        <InsertPhoto /> Upload Image
                    </label>
                </div>
                <div className="col-lg-6 col-md-6">
                    <h4>Full name</h4>
                    <p>{app.auth().currentUser.displayName}</p>
                    <hr />
                    <h4>Email</h4>
                    <p>{app.auth().currentUser.email}</p>
                    <hr />
                    <h4>Phone number</h4>
                    <p>
                        {
                            app.auth().currentUser.phoneNumber || 
                            personInfo.phone || 
                            <span>Not specified</span>
                        }
                    </p>
                    <hr />
                    <h4>Gender</h4>
                    <p>
                        {
                            app.auth().currentUser.gender || 
                            personInfo.gender || 
                            <span>Not specified</span>
                        }
                    </p>
                    <hr />
                    <Link 
                        to="/agent/edit-profile" 
                        className="float-right account-edit"
                    >
                        Edit
                    </Link>
                </div>
            </div>
          </div>  
        </>
    )
}

export default AgentProfile
