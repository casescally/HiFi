import React, { useContext } from "react"
import { SongContext } from "../song/SongProvider"
import Song from "../song/Song"
import "../song/Songs.css"
import { UserContext } from "../user/UserProvider"

export default (props) => {

    const { songs } = useContext(SongContext)
    const { users } = useContext(UserContext)
    const chosenSongId = parseInt(props.match.params.songId, 10)
    // const song = songs.find(s => s.id === chosenSongId) || {}
    const currentUsersProfile = users.find(u => u.id === parseInt(localStorage.getItem("currentUser"))) || {}
    const userSongs = songs.filter(song => {
    // const player = document.getElementById("player")
    // const playerWindow = document.getElementById("playerWindow")
    // if (player.src != undefined) {}

        return song.userId === parseInt(localStorage.getItem("currentUser"))
    })

    return (
        <div className="songs">
            <div className="background">
                <img src=""></img>

                {<h1>Stream</h1>}
            </div>


            <article className="profileSongList">

                {userSongs.map(song => <Song key={song.id} song={song} {...props} />)}

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
                        if (player.isplaying = true){
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
