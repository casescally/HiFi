import React, { useRef, useState, useContext, useEffect } from "react"
import "./ProfileForm.css"
import FileUploader from "react-firebase-file-uploader";
import * as firebase from "firebase/app";
import "firebase/storage";
import { UserContext } from "../user/UserProvider"

const UpdateProfile = props => {
    const { users } = useContext(UserContext)
    const currentUser = users.find(u => u.id === parseInt(localStorage.getItem("currentUser"))) || {}
    const editMode = props.match.params.hasOwnProperty("userId")
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const username = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    // const profilePicture = React.forwardRef((props, ref) => (
    //     <input ref={ref} className="profilePicture">
    //       {props.children}
    //     </input>
    //   ));
    //   const ref = React.createRef();
    const [profilePictureURL, setProfilePictureURL] = useState("");
    const [backgroundCoverURL, setBackgroundCoverURL] = useState("");
    // const currentUserObject = [user, setUser] = useState({})

    // const handleControlledUserInputChange = (event) => {
    //     /*
    //         When changing a state object or array, always create a new one
    //         and change state instead of modifying current one
    //     */
    //     const updatedUser = Object.assign({}, user)
    //     updatedUser[event.target.name] = event.target.value
    //     setUser(newUser)
    // } 

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
                    fetch(`http://localhost:8088/users/${parseInt(localStorage.getItem("currentUser"))}`, {
                        method: "PUT",
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
                                props.history.push("/")
                            }
                        })
                })
        } else {
            window.alert("Passwords do not match")
        }
    }
    const imageUploader = filename => {
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

        const setDefaults = () => {
            if (editMode) {
                const userId = parseInt(props.match.params.userId)
                const selectedUser = users.find(u => u.id === userId) || {}
                const selectedProfilePicture = selectedUser.profilePicture
                const selectedBackgroundCover = selectedUser.backgroundCover
                setProfilePictureURL(selectedProfilePicture)
                setBackgroundCoverURL(selectedBackgroundCover)
            }
        }

        useEffect(() => {
            setDefaults()
        }, [users])


        const currentFullName = currentUser.name

        const currentFullNameArray = currentFullName.split(" ")        



        const currentFirstName = currentFullNameArray[0]
        const currentLastName = currentFullNameArray[1]

    return (

        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Update information</h1>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input ref={firstName} type="text"
                        name="firstName"
                        className="form-control"
                        placeholder="First name"
                        defaultValue={currentFirstName}
                        required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input ref={lastName} type="text"
                        name="lastName"
                        defaultValue={currentLastName}
                        className="form-control"
                        placeholder="Last name"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Email address </label>
                    <input ref={email} type="email"
                        name="email"
                        defaultValue={currentUser.email}
                        className="form-control"
                        placeholder="Email address"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="username"> Username </label>
                    <input ref={username} type="username"
                        name="username"
                        className="form-control"
                        defaultValue={currentUser.username}
                        placeholder="Username"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> Password </label>
                    <input ref={password} type="password"
                        name="password"
                        className="form-control"
                        defaultValue={currentUser.password}
                        placeholder="Password"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> Verify Password </label>
                    <input ref={verifyPassword} type="password"
                        name="verifyPassword"
                        defaultValue={currentUser.password}
                        className="form-control"
                        placeholder="Verify password"
                        required />
                </fieldset>

                <fieldset className="profilePictureUpload">   
                <div>
                <label>Choose a profile picture: <img className="selectProfilePicture" src={profilePictureURL} /></label>
                    <FileUploader
                    accept="/*"
                    name="image"
                    // ref={profilePictureURL}
                    filename={file => file.name.split(".")[0]}
                    storageRef={firebase.storage().ref("images")}
                    onUploadSuccess={imageUploader}
                    />
            </div>
            </fieldset>

            <fieldset className="backgroundCoverUpload">   
                <div>
                <label>Choose a background cover: <img className="selectBackgroundCover" src={backgroundCoverURL} /></label>
                    <FileUploader
                    accept="/*"
                    name="image"
                    // ref={profilePictureURL}
                    filename={file => file.name.split(".")[0]}
                    storageRef={firebase.storage().ref("images")}
                    onUploadSuccess={backgroundCoverUploader}
                    />
            </div>
            </fieldset>

                <fieldset>
                    <button className="submitButton" type="submit">
                        Submit
                    </button>
                </fieldset>
            </form>
        </main>
    )
}

export default UpdateProfile