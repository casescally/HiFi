import React, { useContext } from "react"
import { SongContext } from "../song/SongProvider"
import Song from "../song/Song"
import "./Stream.css"
import { UserContext } from "../user/UserProvider"
import { FollowerContext } from "../follower/FollowerProvider"


export default (props) => {


    const { followers } = useContext(FollowerContext)
    const currentUsersFollowers = followers.filter(f => f.userId === parseInt(localStorage.getItem("currentUser")) && f.active)
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


    // const followerSongs = songs.forEach(song => {

    //         song.userId === currentUsersFollowers.followerId
    //     })

const streamSongs = []

        {
            currentUsersFollowers.forEach(follower => {
    
                // Find this relationships's matching song object
                const foundSong = songs.filter(
                    (singleSong) => {
                        return follower.followerId === singleSong.userId
                    }
                )[0]
                if (foundSong !== undefined) {
                streamSongs.push(foundSong)
            }})
        }


        // streamSongs.push(userSongs)

// console.log(streamSongs)


    return (
        <div className="songs">

            <div className="streamBackground">

                <h1 id="streamTitle">Stream</h1>

            </div>

            <article className="streamSongList">

                {/* {userSongs.map(song => <Song key={song.id} song={song} {...props} />)} */}

                {streamSongs.map(song => <Song key={song.id} song={song} {...props} />)}

            </article>
    
        </div>
    )
}
