import React, { useContext } from "react"
import { FollowerContext } from "./FollowerProvider"
import "./Followers.css"

export default ({ follower, match, history }) => {
    const { followers, deleteFollower } = useContext(FollowerContext)
 
    return (
    <section className="follower">
        <div className="follower__profilePicture"></div>
        <div className="follower__name">
            
            {follower.name}</div>
        <div className="follower__username">{follower.username}</div>
        <div className="follower__check">{follower.check}</div>
        <button className="btn--delete"
                onClick={() => {
                deleteFollower(follower)
                    .then(() => {
                        history.push("/")
                     })
                    }} >Delete
        </button>
    </section>
)}
