import React, { useContext } from "react"
import { SongContext } from "../song/SongProvider"
import Song from "../song/Song"
import "../song/Songs.css"
import { UserContext } from "../user/UserProvider"
import { FollowerContext } from "../follower/FollowerProvider"
import Follower from "../follower/Follower"
import { LikeContext } from "../likes/LikesProvider"
import Like from "../likes/Like"
import "./Profiles.css"

export default (props) => {

    const { followers, addFollower, updateFollower } = useContext(FollowerContext)
    const { songs } = useContext(SongContext)
    const { users } = useContext(UserContext)
    const chosenUserId = parseInt(props.match.params.userId, 10)
    const { likes } = useContext(LikeContext)
    const profilesArray = []
    let editProfileMode = Boolean

    if (chosenUserId !== parseInt(localStorage.getItem("currentUser"))) {
        let foundProfile = users.find(u => u.id === chosenUserId) || {}
        editProfileMode = false
        profilesArray.push(foundProfile)

    } else {
        let foundProfile = users.find(u => u.id === parseInt(localStorage.getItem("currentUser"))) || {}
        editProfileMode = true
        profilesArray.push(foundProfile)

    }

    const currentProfile = profilesArray[0]
    const currentProfileId = currentProfile.id
    const likesRelationships = likes.filter(like => like.userId === currentProfile.id)
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

    const relationships = followers.filter(follower => follower.userId === currentProfile.id && follower.active === true)
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

        const followedUser = followers.filter(singleRel => singleRel.followerId === clickedUser.id)
        // const currentlyFollowing = followedUser.filter(f => f.active === true)
        const foundUser = followedUser.find(f => f.userId === parseInt(localStorage.getItem("currentUser")))

        if (foundUser === undefined || followedUser.length === 0) {

            return addFollower({

                "userId": parseInt(localStorage.getItem("currentUser")),
                "followerId": clickedUser.id,
                "active": true

            })

        } if (foundUser.active === false) {

            return updateFollower(true, foundUser)

        } else if (followedUser === undefined) {

            return alert("Error.")
            //  addFollower({

            //     "userId": parseInt(localStorage.getItem("currentUser")),
            //     "followerId": clickedUser.id,
            //     "active": true

            // })
        }
    }

    const currentUserSongs = songs.filter(song => {
        return song.userId === currentProfile.id

    })

    return (

        <div className="profile">

            <section className="userProfile">

                <div className="profileBackground" style={{
                    backgroundImage: "url(" + `${currentProfile.backgroundCover}` + ")",
                    backgroundPosition: 'center',
                    // backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    objectFit: 'contain',
                    maxwidth: '100%'
                }}>


                    
                    <span id="profileInfo">

                <img id="profilePicture" className="profilePicture" alt={`${currentProfile.name}'s profile picture`} src={currentProfile.profilePicture}></img>



                        {<h1 className="currentProfileName">{currentProfile.name}</h1>}

                        {/* <img id="backgroundCover" className="backgroundCover" alt={`${currentProfile.name}'s background cover`} src={currentProfile.backgroundCover}></img> */}

                        {/* <button className="followButton" value="Follow">Follow</button> */}
                        <button className="followButton" onClick={evt => {
                            if (editProfileMode) {
                                evt.preventDefault()
                                props.history.push(`edit/${currentProfileId}`)
                            } else if (editProfileMode === false) {
                                evt.preventDefault()
                                constructNewFollower(currentProfile)
                            }
                        }}>{editProfileMode ? "Edit" : "Follow"}</button>
                    </span>
                </div>



<div className="mainProfileSection">
                <article className="profileSongList">
                    <h3>Songs: {currentUserSongs.length}</h3>

                    {currentUserSongs.map(song => <Song key={song.id} song={song} {...props} />)}

                </article>

<div className="profileSidebar">

                <article id="followers">

                    <h3>Following: {currentUsersFollowers.length}</h3>

                    {currentUsersFollowers.map(follower => <Follower key={follower.id} follower={follower} {...props} />)}

                </article>

                <article id="likedSongs" className="profileLikesList">

                    <h3>Likes</h3>

                    {currentUsersLikes.map(like => <Like key={like.id} like={like} {...props} />)}

                </article>
</div>

                </div>
            </section>
        </div>
    )
}
