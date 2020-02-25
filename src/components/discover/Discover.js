import React, { useContext } from "react"
import { SongContext } from "../song/SongProvider"
import Song from "../song/Song"
import "./Discover.css"
// import { UserContext } from "../user/UserProvider"

export default (props) => {

    const { songs } = useContext(SongContext)
    // const { users } = useContext(UserContext)
    // const chosenSongId = parseInt(props.match.params.songId, 10)
    // const currentUsersProfile = users.find(u => u.id === parseInt(localStorage.getItem("currentUser"))) || {}
    // const userSongs = songs.filter(song => {

    //     return song.userId === parseInt(localStorage.getItem("currentUser"))
    // })

    return (
        <div className="songs">

            <div className="discoverBackground">

                <h1 id="discoverTitle">Discover</h1>

            </div>

            <article className="discoverSongList">

                {songs.map(song => <Song key={song.id} song={song} {...props} />)}

            </article>

        </div>
    )
}
