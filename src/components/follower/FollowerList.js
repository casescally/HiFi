import React, { useContext } from "react"
import { FriendContext } from "./FriendProvider"
import { UserContext } from "../user/UserProvider"
import Friend from "./Friend"
import "./Friends.css"

export default (props) => {

    const { user } = useContext(UserContext)
    const { friends } = useContext(FriendContext)
    const relationships = friends.filter(friend => friend.userId === parseInt(localStorage.getItem("currentUser")))
    const currentUsersFreinds = []

    // const usersFreinds = users.filter(freind => freindsRelationships.freindId === user.id)
    // freindsRelationships.map(freind => freind.freindId === true)

    return (
        <div className="friends">
            <h1>Friends</h1>
            <button onClick={() => props.history.push("/friends/create")}>
                Add Friend
            </button>
            <article className="friendList">
                
                {
                    relationships.forEach(rel => {

                        // Find this relationships's matching user object
                        const foundFreind = user.filter(
                            (singleUser) => {
                                return rel.freindId === singleUser.id
                            }
                        )[0]

                        currentUsersFreinds.push(foundFreind)

                        console.log(currentUsersFreinds)

                    })
                }

                {currentUsersFreinds.map(friend => <Friend key={friend.id} friend={friend} {...props}/>)}

            </article>

            <article>
                Freind Requests:
            </article>

        </div>
    )
}

// {users.map(user => <Friend key={friend.id} friend={friend} />)}