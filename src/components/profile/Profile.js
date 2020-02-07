import React, { useContext } from "react"
import { SongContext } from "../song/SongProvider"
import Song from "../song/Song"
import "../song/Songs.css"
import { UserContext } from "../user/UserProvider"


export default (props) => {

    const { songs } = useContext(SongContext)

    const { users } = useContext(UserContext)

    const userSongs = songs.filter(song => {
        return song.userId === parseInt(localStorage.getItem("currentUser"))
    })

    const profileUsername = () => {

    const currentUserObject = users.find(user => {
        return user.id === parseInt(localStorage.getItem("currentUser"))
    })
    
    return currentUserObject
}

    console.log(profileUsername())

    return (  
        <div className="songs">
            <h1>Current User</h1>

            <article className="profileSongList">
            {userSongs.map(song => <Song key={song.id} song={song} {...props} />)}
            </article>
        </div> 
    )
}
