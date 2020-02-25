import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { LikeContext } from "../likes/LikesProvider"
import { UserContext } from "../user/UserProvider"
import "./Songs.css"

export default ({ song }) => {

    const { users } = useContext(UserContext)
    const { likes, addLike, deleteLike } = useContext(LikeContext)
    const user = users.find(u => u.id === song.userId) || {}
    const currentSongsLikes = likes.filter(like => like.songId === song.id)
    const constructNewLike = (currentSong) => {
        const alreadyLikedSong = likes.find(like => like.songId === currentSong.id && like.userId === parseInt(localStorage.getItem("currentUser")))
        const user = users.find(u => u.id === song.userId) || {}

        //Don't allow duplicate likes
        if (alreadyLikedSong === undefined) {
            likedSongMode = false
            addLike({
                songId: currentSong.id,
                userId: parseInt(localStorage.getItem("currentUser"))
            })
        } if (alreadyLikedSong !== undefined) {
            likedSongMode = true
            deleteLike(likes.find(like => like.songId === currentSong.id && like.userId === parseInt(localStorage.getItem("currentUser"))))
        }
    }

    let likedSongMode = Boolean

    return (

        //song information
        <section className="songSection">
<div className="songInfo">
            <button className="songPlayButton" onClick={
                function () {
                    const player = document.getElementById("songPlayer")
                    const audioPlayer = player.parentElement
                    player.src = `${song.url}`
                    audioPlayer.load()
                }}><img className="playButtonIcon" src="https://firebasestorage.googleapis.com/v0/b/hifi-ed258.appspot.com/o/images%2FPlayButton3.png?alt=media&token=16374b88-23e6-4c1a-843a-ed22878773f2" alt="playButtonIcon"></img>
        </button>
            <img className="coverImage" src={song.songCoverUrl}></img>





<div className="songUploader">

            <h3>
                <Link to={`/users/${song.userId}`}>

                    <div className="song__user">{user.username}</div>
                </Link>
            </h3>

            {/* {console.log(currentSongsLikes)} */}

            <h3 className="song__name">

                <Link to={`/songs/${song.id}`} className="songLink">
                    {song.name}
                </Link>

  </h3>

  </div>
</div>
                <div className="likeInfo">

                Likes: {currentSongsLikes.length}
                <button className="likeButton" value="Like" onClick={evt => {
                    evt.preventDefault()

                    constructNewLike(song)
                }
                }>{likedSongMode ? "Like" : "Unlike"}</button>




</div>



                <div className="uploaderInfo">

                </div>

          
        </section>
    )
}
