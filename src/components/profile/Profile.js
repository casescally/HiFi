import React, { useContext } from "react"
import { SongContext } from "../song/SongProvider"
import Song from "../song/Song"
import "../song/Songs.css"
import { UserContext } from "../user/UserProvider"
import { FollowerContext } from "../follower/FollowerProvider"
import Follower from "../follower/Follower"
import { LikeContext } from "../likes/LikesProvider"
import Like from "../likes/Like"

export default (props) => {

    const { followers, addFollower } = useContext(FollowerContext)   
    const { songs } = useContext(SongContext)
    const { users } = useContext(UserContext)
    const chosenUserId = parseInt(props.match.params.userId, 10)
    const { likes } = useContext(LikeContext)
    const profilesArray = []

    if (chosenUserId !== parseInt(localStorage.getItem("currentUser"))) {
        let foundProfile = users.find(u => u.id === chosenUserId) || {}
        profilesArray.push(foundProfile)



    } else {
        let foundProfile = users.find(u => u.id === parseInt(localStorage.getItem("currentUser"))) || {}
        profilesArray.push(foundProfile)

    }

    const currentProfile = profilesArray[0]
    const likesRelationships = likes.filter(like => like.userId == currentProfile.id)
    const currentUsersLikes = []

    {
        likesRelationships.forEach(rel => {

            // Find this relationships's matching user object
            const foundLike = songs.filter(
                (singleSong) => {
                    return rel.songId === singleSong.id
                }
            )[0]
            //if page is reloaded and no likes are found
            if (foundLike !== undefined) {
                currentUsersLikes.push(foundLike)
            }
        })
    }

    const relationships = followers.filter(follower => follower.userId === currentProfile.id)
    const currentUsersFollowers = []

    {
        relationships.forEach(rel => {

            // Find this relationships's matching user object
            const foundFollower = users.filter(
                (singleUser) => {
                    return rel.followerId === singleUser.id
                }
            )[0]

            currentUsersFollowers.push(foundFollower)
        })
    }

    const constructNewFollower = (clickedUser) => {

        const currentFollowers = followers
        const followedUser = currentFollowers.find(singleUser => singleUser.userId === clickedUser)

            if (followedUser === undefined) {

                addFollower({
                    "userId": parseInt(localStorage.getItem("currentUser")),
                    "followerId": clickedUser
    })
}}
    
    const currentUserSongs = songs.filter(song => {
        return song.userId === currentProfile.id
    })
    
    return (
        <div className="profile">

            <section className="userProfile">
                <div className="background">
                    <img id="profilePicture" alt="User's profile picture" src=""></img>

                    {<h1>{currentProfile.name}</h1>}

                    {/* <button className="followButton" value="Follow">Follow</button> */}
                </div>

            <button className="followButton" onClick={evt => {
                        evt.preventDefault()
                        constructNewFollower(currentProfile.id)
             }}>Follow</button>
            <article className="profileSongList">
            <h3>Songs {currentUserSongs.length}</h3>

                {currentUserSongs.map(song => <Song key={song.id} song={song} {...props} />)}

            </article>

            <article id="followers">

                <h3>Followers: {currentUsersFollowers.length}</h3>

                {currentUsersFollowers.map(follower => <Follower key={follower.id} follower={follower} {...props} />)}

            </article>

            <article id="likedSongs" className="profileLikesList">

                <h3>Likes</h3>

                {currentUsersLikes.map(like => <Like key={like.id} like={like} {...props} />)}

            </article>
            </section>
        </div>
    )
}
