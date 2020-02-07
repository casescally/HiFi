import React, { useReducer } from "react"
import "./Songs.css"
import { Link } from "react-router-dom"

export default ({ song }) => (
    <section className="songSection">

        <h3 className="song__name">

            <Link to={`/songs/${song.id}`}>
                {song.name}
            </Link>

            <audio controls>
                <source src={`http://localhost:8080/${song.url}`} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>

            <div class="uploaderInfo">

                <img className="profilePicture" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"></img>

                <h3>uploaders name</h3>

            </div>
        </h3>
    </section>
)
