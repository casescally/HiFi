import React, { useReducer } from "react"
import "./Songs.css"
import { Link } from "react-router-dom"

export default ({ song }) => (

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

            <div className="uploaderInfo">

            </div>

            <div className="songInfo">
                {song.songDescription}
            </div>

        </h3>
    </section>
)
