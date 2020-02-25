import React, { useRef, useState } from "react"
import "./Register.css"
import FileUploader from "react-firebase-file-uploader";
import * as firebase from "firebase/app";
import "firebase/storage";
// import "..song/songs.css"

const Register = props => {
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const username = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const [profilePictureURL, setProfilePictureURL] = useState("");
    const [backgroundCoverURL, setBackgroundCoverURL] = useState("");

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email.current.value}`)
            .then(_ => _.json())
            .then(user => {
                if (user.length) {
                    return true
                }
                return false
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            existingUserCheck()
                .then(() => {
                    fetch("http://localhost:8088/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: email.current.value,
                            username: username.current.value,
                            password: password.current.value,
                            name: `${firstName.current.value} ${lastName.current.value}`,
                            profilePicture: profilePictureURL,
                            backgroundCover: backgroundCoverURL
                        })
                    })
                        .then(_ => _.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                localStorage.setItem("currentUser", createdUser.id)
                                props.history.push("/")
                            }
                        })
                })
        } else {
            window.alert("Passwords do not match")
        }
    }
    const profileImageUploader = filename => {
        console.log("filename", filename);
        firebase
            .storage()
            .ref("images")
            .child(filename)
            .getDownloadURL()
            .then(firebaseUrl => {
                setProfilePictureURL(firebaseUrl)
            })
    }

    const backgroundCoverUploader = filename => {
        console.log("filename", filename);
        firebase
            .storage()
            .ref("images")
            .child(filename)
            .getDownloadURL()
            .then(firebaseUrl => {
                setBackgroundCoverURL(firebaseUrl)
            })
    }

    return (

        <main className="container--register" style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Register to use HiFi</h1>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input ref={firstName} type="text"
                        name="firstName"
                        className="form-control"
                        placeholder="First name"
                        required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input ref={lastName} type="text"
                        name="lastName"
                        className="form-control"
                        placeholder="Last name"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Email address </label>
                    <input ref={email} type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email address"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="username"> Username </label>
                    <input ref={username} type="username"
                        name="username"
                        className="form-control"
                        placeholder="Username"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> Password </label>
                    <input ref={password} type="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> Verify Password </label>
                    <input ref={verifyPassword} type="password"
                        name="verifyPassword"
                        className="form-control"
                        placeholder="Verify password"
                        required />
                </fieldset>

                <div className="uploadBoxes">

                    <fieldset className="profilePictureUploadField">

                        <label className="chooseProfilePicture">Choose a profile picture: </label>
                        <div className="profilePictureUpload">
                            <img className="selectProfilePicture" src={profilePictureURL} />
                            <FileUploader
                                accept="/*"
                                name="image"
                                className="profilePictureUploader"
                                // ref={profilePictureURL}
                                filename={file => file.name.split(".")[0]}
                                storageRef={firebase.storage().ref("images")}
                                onUploadSuccess={profileImageUploader}
                            />
                        </div>
                    </fieldset>


                    <fieldset className="backgroundCoverUploadField">

                        <label className="chooseBackgroundCover">Choose a background cover: </label>
                        <div className="backgroundCoverUpload">

                            <FileUploader
                                accept="/*"
                                name="image"
                                className="backgroundCoverUploader"
                                // ref={profilePictureURL}
                                filename={file => file.name.split(".")[0]}
                                storageRef={firebase.storage().ref("images")}
                                onUploadSuccess={backgroundCoverUploader}
                            />
                            <img className="selectBackgroundCover" src={backgroundCoverURL} />
                        </div>
                    </fieldset>
                </div>
                <fieldset>
                    <button type="submit" id="submitRegistration">
                        Sign in
                    </button>
                </fieldset>
            </form>
        </main>
    )
}

export default Register