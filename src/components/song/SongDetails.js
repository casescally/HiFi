import React, { useContext } from "react"
import { UserContext } from "../user/UserProvider"
import { SongContext } from "./SongProvider"
import "./Songs.css"

export default (props) => {
    const { songs, deleteSong } = useContext(SongContext)
    const { users } = useContext(UserContext)

    const chosenSongId = parseInt(props.match.params.songId, 10)

    const song = songs.find(s => s.id === chosenSongId) || {}
    const user = users.find(u => u.id === song.userId) || {}

    return (
        <section className="individualSong">
            <h3 className="song__name">{song.name}</h3>
            <div className="song__user">{user.name}</div>
            <button onClick={
                () => {
                    deleteSong(song)
                        .then(() => {
                            props.history.push("/")
                        })
                }
            }>
                Delete Song
            </button>
            <button onClick={() => {
                props.history.push(`/songs/edit/${song.id}`)
            }}>Edit Song</button>
        </section>
    )
}
