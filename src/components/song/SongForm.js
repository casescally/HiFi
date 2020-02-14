import React, { useContext, useState, useEffect } from "react"
import { SongContext } from "./SongProvider"
import { UserContext } from "../user/UserProvider"
import FileUploader from "react-firebase-file-uploader";
import * as firebase from "firebase/app";
import "firebase/storage";
   
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
//this is the function that is uploading new logos from firebase and adding an image to the json database
    const songUploader = filename => {
        console.log("filename", filename);
        firebase
          .storage()
          .ref("songs")
          .child(filename)
          .getDownloadURL()
            .then(firebaseUrl => {
              setURL(firebaseUrl)
            //   addSong({
            //     userId: parseInt(localStorage.getItem("currentUser")),
            //     url: firebaseUrl,
            //     name: filename,
            //     songCoverUrl: "none",
            //     songDescription: "First song",
            //     genre: "Rock",
            //     playCount: 20
            //   })
            })
        }


    const setDefaults = () => {
        if (editMode) {
            const songId = parseInt(props.match.params.songId)
            const selectedSong = songs.find(s => s.id === songId) || {}
            setSong(selectedSong)
        }
    }

    useEffect(() => { 
        setDefaults()
    }, [songs])

    const constructNewSong = () => {
        const userId = parseInt(song.songId)



        if (userId === 0) {
            window.alert("Please select a song")
        } else {
            if (editMode) {
                updateSong({
                    id: song.id,
                    name: song.name,
                    songDescription: song.name,
                    songCoverUrl: song.url,
                    userId: parseInt(localStorage.getItem("currentUser"))
                })
                    .then(() => props.history.push("/"))
            } else {


                addSong({
                    id: song.id,
                    name: song.name,
                    url: URL,
                    songDescription: song.description,
                    songCoverUrl: song.url,
                    userId: parseInt(localStorage.getItem("currentUser"))
                })
                    .then(() => props.history.push("/"))
            }
        }
    }

    return (
        <form className="songForm">
            <h2 className="songForm__title">{editMode ? "Update Song" : "Upload Song"}</h2>
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
                        defaultValue={song.description}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>

                <div>
                <label><img src={URL} /></label>
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
                <div className="form-group">
                    <label htmlFor="songCover">Song Cover: </label>

                
                    
                    <input type="file" name="songCover" className="form-control"
                        proptype="varchar"

                        onChange={handleControlledInputChange}>
                    </input>
  

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
