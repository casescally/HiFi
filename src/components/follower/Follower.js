import React, { useContext } from "react"
import { FollowerContext } from "./FollowerProvider"
import "./Followers.css"
import { Link } from "react-router-dom"

export default ({ follower, match, history }) => {
    const { followers, deleteFollower } = useContext(FollowerContext)

    return (
    <section className="follower">
        <div className="follower__profilePicture"></div>

        <div className="follower__name">
            
        <Link to={`/users/${follower.id}`}>
        {follower.name}
            </Link>
            
            </div>
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
