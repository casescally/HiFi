import React, { useContext } from "react"
import "./Songs.css"
import { Link } from "react-router-dom"
import { LikeContext } from "../likes/LikesProvider"




export default ({ song }) => {
    const { addLike } = useContext(LikeContext)

    const constructNewLike = (currentSong) => {
        addLike({
            songId: currentSong,
            userId: parseInt(localStorage.getItem("currentUser"))
        })
    }
        return (

            <section className="songSection">

                <button onClick={
                    function () {
                        const player = document.getElementById("songPlayer")
                        const audioPlayer = player.parentElement
                        player.src = `http://localhost:8080/${song.url}`
                        audioPlayer.load()
                    }}>Play
        </button>

                <h3>

                    <Link to={`/users/${song.userId}`}>
                        {song.userId}
                    </Link>

                </h3>

                <h3 className="song__name">

                    <Link to={`/songs/${song.id}`}>
                        {song.name}
                    </Link>

                    Plays: {song.playCount}
                    Likes:
            <button className="likeButton" value="Like" onClick={evt => {
                        evt.preventDefault()
                        constructNewLike(song.id)
                    }
                    }>Like</button>

                    <div className="uploaderInfo">

                    </div>

                    <div className="songInfo">
                        {song.songDescription}
                    </div>

                </h3>
            </section>
        )
    }
