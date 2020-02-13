import React, { useContext } from "react"
import { FollowerContext } from "../follower/FollowerProvider"
import { UserContext } from "../user/UserProvider"
import Follower from "./Follower"
import "./Followers.css"

export default (props) => {

    const { user } = useContext(UserContext)
    const { followers } = useContext(FollowerContext)
    const relationships = followers.filter(follower => follower.userId === parseInt(localStorage.getItem("currentUser")))
    const currentUsersFollowers = []

    // const usersFrollowers = users.filter(follower => followersRelationships.followerdId === user.id)
    // followersRelationships.map(follower => follower.followerId === true)

    return (
        <div className="followers">
            <h1>Followers</h1>
            <button onClick={() => props.history.push("/followers/create")}>
                Add Follower
            </button>
            <article className="followerList">
                
                {
                    relationships.forEach(rel => {

                        // Find this relationships's matching user object
                        const foundFollower = user.filter(
                            (singleUser) => {
                                return rel.followerId === singleUser.id
                            }
                        )[0]

                        currentUsersFollowers.push(foundFollower)

                        console.log(currentUsersFollowers)

                    })
                }

                {currentUsersFollowers.map(follower => <Follower key={follower.id} follower={follower} {...props}/>)}

            </article>
        </div>
    )
}

// {users.map(user => <Follower key={follower.id} follower={follower} />)}