import React, { useContext, useState, useEffect } from "react"
import { SongContext } from "./SongProvider"
import { UserContext } from "../user/UserProvider"

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
                <div className="form-group">
                    <label htmlFor="songId">Song: </label>
                    <input type="file" name="song"></input>
                    
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="songCover">Song Cover: </label>
                    <textarea type="text" name="songCover" className="form-control"
                        proptype="varchar"
                        value={song.url}
                        onChange={handleControlledInputChange}>
                    </textarea>
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
