import React, { useContext } from "react"
import { FriendContext } from "./FriendProvider"
import "./Friends.css"

export default ({ friend, match, history }) => {
    const { friends, deleteFriend } = useContext(FriendContext)
 
    return (
    <section className="friend">
        <div className="freind__profilePicture"></div>
        <div className="friend__firstName">{friend.firstName}</div>
        <div className="friend__firstName">{friend.lastName}</div>
        <div className="friend__username">{friend.username}</div>
        <div className="friend__check">{friend.check}</div>
        <button className="btn--delete"
                onClick={() => {
                deleteFriend(friend)
                    .then(() => {
                        history.push("/")
                     })
                    }} >Delete
        </button>
    </section>
)}
