import React, { useContext, useReducer } from "react"
import { Link } from "react-router-dom"
import { LikeContext } from "../likes/LikesProvider"
import { UserContext } from "../user/UserProvider"
import "../song/Songs.css"


export default ({ like }) => {

    const { users } = useContext(UserContext)
    const { likes, addLike, deleteLike } = useContext(LikeContext)
    const user = users.find(u => u.id === like.userId) || {}
    const currentSongsLikes = likes.filter(l => l.songId === like.id)
    const constructNewLike = (currentSong) => {
        const alreadyLikedSong = likes.find(like => like.songId === currentSong.id && like.userId === parseInt(localStorage.getItem("currentUser")))
        const user = users.find(u => u.id === like.userId) || {}

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

        <section className="songSection">

            <button onClick={
                function () {
                    const player = document.getElementById("songPlayer")
                    const audioPlayer = player.parentElement
                    player.src = `${like.url}`
                    audioPlayer.load()
                }}>Play
                </button>

                <img className="coverImage" src={like.songCoverUrl} alt={`${like.name} cover image`}></img>


            <h3>

                <Link to={`/users/${like.userId}`}>

                    <div className="song__user">{user.name} - </div>
                </Link>

            </h3>

            <h3 className="song__name">

                <Link to={`/songs/${like.id}`}>
                    {like.name}
                </Link>

                Plays: {like.playCount}
                Likes: {currentSongsLikes.length}
                <button className="likeButton" value="Like" onClick={evt => {
                    evt.preventDefault()

                    constructNewLike(like)
                }
                }>{likedSongMode ? "Like" : "Unlike"}</button>

                <div className="uploaderInfo">

                </div>

                <div className="songInfo">
                    {like.songDescription}
                </div>

            </h3>
        </section>
    )
}
