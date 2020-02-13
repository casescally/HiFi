import React, { useReducer } from "react"
import "../song/Songs.css"
import { Link } from "react-router-dom"


    export default ({ like }) => (

    <section className="likeSection">

                <button onClick={
                    function(){
                    const player = document.getElementById("songPlayer")
                    const audioPlayer = player.parentElement
                    player.src = `http://localhost:8080/${like.url}` 
                    audioPlayer.load()
                    }}>Play
                </button>

            <h3>

            <Link to={`/users/${like.userId}`}>
                {like.userId}
            </Link>

            </h3>

        <h3 className="song__name">

            <Link to={`/songs/${like.id}`}>
                {like.name}
            </Link>

            <div className="uploaderInfo">

            </div>
        </h3>
    </section>
)
