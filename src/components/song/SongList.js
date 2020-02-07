import React, { useContext } from "react"
import { SongContext } from "./SongProvider"
import Song from "./Song"
import "./Songs.css"

export default (props) => {
    const { songs } = useContext(SongContext)
    const userSongs = songs.filter(song => {

        return song.userId === parseInt(localStorage.getItem("currentUser"))
    })
debugger
    return (  
        <div className="songs">
            <h1>Songs</h1>

            <article className="songList">
                {
                    userSongs.map(song => <Song key={song.id} song={song} {...props} />)
                }
            </article>
        </div> 
    )
}
