import React, { useContext } from "react"
import { FollowerContext } from "./FollowerProvider"
import "./Followers.css"
import { Link } from "react-router-dom"
// import { fetchDelete } from "./FetchDelete";

export default ({ follower, match, history }) => {
    const { followers, updateFollower } = useContext(FollowerContext)

    // const currentUser = parseInt(localStorage.getItem("currentUser"))
    const follow = followers.find(f => f.followerId === follower.id && f.userId === parseInt(localStorage.getItem("currentUser")))

    return (
        
    <section className="follower">

            <img className="follower__profilePicture" src={follower.profilePicture} alt="followers profile picture"></img>

        <div className="follower__name">
            
            <Link to={`/users/${follower.id}`} className="followerName">
            {follower.name}
            </Link>

        </div>

        <div className="follower__check">{follower.check}</div>
        <button className="btn--delete" className="btn--unfollow"
                onClick={evt => {
                    evt.preventDefault()
                    updateFollower(false, follow)
                        .then(() => {
                                history.push("/")
                            })
                            }} >Unfollow
        </button>
    </section>
)}
