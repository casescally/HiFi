import React, { useContext, useState, useEffect } from "react"
import { SongContext } from "./SongProvider"
import { UserContext } from "../user/UserProvider"
import FileUploader from "react-firebase-file-uploader";
import * as firebase from "firebase/app";
import "firebase/storage";
import "./Songs.css"

export default props => {
    const { users } = useContext(UserContext)
    const { addSong, songs, updateSong } = useContext(SongContext)
    const [song, setSong] = useState({})
    const editMode = props.match.params.hasOwnProperty("songId")
    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newSong = Object.assign({}, song)
        newSong[event.target.name] = event.target.value
        setSong(newSong)
    }

    //this is setting the URL for the firebase song
    const [URL, setURL] = useState("");


    const checkURL = () => {
        if (song.url !== undefined && URL === "") {

            setURL(song.url)
        }
    }

    const [coverURL, setCoverURL] = useState("");

    //upload song to Firebase
    const songUploader = filename => {
        console.log("filename", filename);
        firebase
            .storage()
            .ref("songs")
            .child(filename)
            .getDownloadURL()
            .then(firebaseUrl => {
                setURL(firebaseUrl)
                //   })
            })
    }
    let eventFlag = Boolean
    eventFlag = false
    const eventFlagFunction = () => eventFlag = true
//upload image to Firebase
    const imageUploader = filename => {
        console.log("filename", filename);
        firebase
            .storage()
            .ref("images")
            .child(filename)
            .getDownloadURL()
            .then(firebaseUrl => {
                setCoverURL(firebaseUrl)
                eventFlagFunction()
            })
    }

    const setDefaults = () => {
        if (editMode) {
            const songId = parseInt(props.match.params.songId)
            const selectedSong = songs.find(s => s.id === songId) || {}
            const selectedSongCover = selectedSong.songCoverUrl
            setSong(selectedSong)
            setCoverURL(selectedSongCover)
        }
    }

    useEffect(() => {
        setDefaults()
    }, [songs])

    const constructNewSong = () => {
        const songId = parseInt(song.songId)

        if (songId === 0) {
            window.alert("Please select a song")
        } else {
            if (editMode) {
                updateSong({
                    id: song.id,
                    url: URL,
                    name: song.name,
                    songDescription: song.name,
                    songCoverUrl: coverURL,
                    coverImage: song.coverImage,
                    userId: parseInt(localStorage.getItem("currentUser"))
                })
                    .then(() => props.history.push("/"))
            } else {
                addSong({
                    id: song.id,
                    name: song.name,
                    url: URL,
                    songDescription: song.description,
                    songCoverUrl: coverURL,
                    coverImage: song.coverImage,
                    userId: parseInt(localStorage.getItem("currentUser"))
                })
                    .then(() => props.history.push("/"))
            }
        }
    }

    return (
        <form className="songForm">
            <h2 className="songForm__title"></h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Song name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        proptype="varchar"
                        placeholder="Song name"
                        defaultValue={song.name}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Song description: </label>
                    <input type="text" name="description" required className="form-control"
                        proptype="varchar"
                        placeholder="Song description"
                        defaultValue={song.songDescription}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>

                <div className="songUpload">
                    <label>Song: </label>
                    {checkURL()}
                    <FileUploader
                        accept="/*"
                        name="song"
                        filename={file => file.name.split(".")[0]}
                        storageRef={firebase.storage().ref("songs")}
                        onUploadSuccess={songUploader}
                    />
                </div>

            </fieldset>


            <fieldset>
                <div className="coverUpload">
                    <label>Cover: <img className="selectImage" src={eventFlag ? song.songCoverUrl : coverURL} /></label>
                    <FileUploader
                        accept="/*"
                        name="image"
                        filename={file => file.name.split(".")[0]}
                        storageRef={firebase.storage().ref("images")}
                        onUploadSuccess={imageUploader}
                    />
                </div>

            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewSong()
                }}
                className="btn btn-primary">
                {editMode ? "Save Updates" : "Submit"}
            </button>
        </form>
    )
}
