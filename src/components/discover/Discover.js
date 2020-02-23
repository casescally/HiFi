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
{/* 
                <img className="discoverBanner" src="https://firebasestorage.googleapis.com/v0/b/hifi-ed258.appspot.com/o/images%2FRecordsVinylBG.jpeg?alt=media&token=efd14474-2f28-41c4-be7d-c9a8e92f1317"></img> */}


            </div>

            <article className="profileSongList">

                {songs.map(song => <Song key={song.id} song={song} {...props} />)}

            </article>

        </div>
    )
}
