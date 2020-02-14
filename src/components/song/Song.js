import React, { useContext } from "react"
import "./Songs.css"
import { Link } from "react-router-dom"
import { LikeContext } from "../likes/LikesProvider"
import { UserContext } from "../user/UserProvider"

export default ({ song }) => {

    const { users } = useContext(UserContext)    
    const { likes, addLike } = useContext(LikeContext)
    const currentSongsLikes = likes.filter(like => like.songId == song.id)
    const constructNewLike = (currentSong) => {
    const alreadyLikedSong = likes.find(like => like.songId === currentSong && like.userId == parseInt(localStorage.getItem("currentUser")))
    const user = users.find(u => u.id === song.userId) || {}
        //Don't allow duplicate likes
        if (alreadyLikedSong == undefined) {
        addLike({
            songId: currentSong,
            userId: parseInt(localStorage.getItem("currentUser"))
        })
    }
}


        return (
                
            //song information
            <section className="songSection">

                <button onClick={
                    function () {
                        const player = document.getElementById("songPlayer")
                        const audioPlayer = player.parentElement
                        player.src = `${song.url}`
                        audioPlayer.load()
                    }}>Play
        </button>

                <h3>
                <Link to={`/users/${song.userId}`}>

<div className="song__user"></div>
</Link>
                </h3>

                

                <h3 className="song__name">

                    <Link to={`/songs/${song.id}`}>
                        {song.name}
                    </Link>

                    Plays: {song.playCount}
                    Likes: {currentSongsLikes.length}
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
