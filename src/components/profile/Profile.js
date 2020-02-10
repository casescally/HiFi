import React, { useContext } from "react"
import { SongContext } from "../song/SongProvider"
import Song from "../song/Song"
import "../song/Songs.css"
import { UserContext } from "../user/UserProvider"
import { FollowerContext } from "../follower/FollowerProvider"

export default (props) => {

    const { songs } = useContext(SongContext)
    const { users } = useContext(UserContext)
    const { followers } = useContext(FollowerContext)
    const chosenUserId = parseInt(props.match.params.userId, 10)
    // const song = songs.find(s => s.id === chosenSongId) || {}
    const currentUsersProfile = users.find(u => u.id === parseInt(localStorage.getItem("currentUser"))) || {}
    const profilesArray = []

    if (chosenUserId !== parseInt(localStorage.getItem("currentUser"))) {
        let foundProfile = users.find(u => u.id === chosenUserId) || {}
        profilesArray.push(foundProfile)
        console.log(foundProfile)
    } else {
        let foundProfile = users.find(u => u.id === parseInt(localStorage.getItem("currentUser"))) || {}
        profilesArray.push(foundProfile)
        console.log(foundProfile)
    }
    const currentProfile = profilesArray[0]
    console.log(currentProfile)
    // const userFollowers = followers.filter(follower => {
    //     return follower.userId === parseInt(localStorage.getItem("currentUser"))
    // })

    const userSongs = songs.filter(song => {
        return song.userId === parseInt(localStorage.getItem("currentUser"))
    })

    const currentUserSongs = songs.filter(song => {
        return song.userId === currentProfile.id
    })    

    return (
        <div className="songs">
            <div className="background">
                <img src=""></img>

                {<h1>{currentProfile.name}</h1>}
            </div>


            <article className="profileSongList">

                {currentUserSongs.map(song => <Song key={song.id} song={song} {...props} />)}

            </article>

            <div className="player">
                <img className="profilePicture" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"></img>


                <div>

                    }

</div>

                <audio autoPlay id="player">

                    <source src="" type="audio/mpeg" id="songPlayer" />
                    Error.
                </audio>

                <div className="playerWindow">
                    <button id="pauseButton" onClick={function () {
                        const player = document.getElementById("player")
                        if (player.isplaying = true) {
                            player.pause()
                        } else if (player.isplaying !== true) {
                            console.log("das")
                            player.play()
                        }
                    }}>Pause</button>
                </div>
            </div>
        </div>
    )
}
