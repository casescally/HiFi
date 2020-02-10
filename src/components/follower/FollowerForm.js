import React, { useContext, useRef } from "react"
import { FriendContext } from "./FriendProvider"
import { UserContext } from "../user/UserProvider"
import "./Friends.css"

export default props => {
    const { addFriend } = useContext(FriendContext)
    const { user } = useContext(UserContext)
    const friendCheck = useRef("")

    const constructNewFriend = () => {
    const searchedUser = user
    const foundUser = searchedUser.find(singleUser => singleUser.username === friendCheck.current.value)
    console.log(foundUser)

        if (foundUser === undefined) {
            return alert("Wrong username")

        } else if (foundUser.username === friendCheck.current.value) {


            addFriend({
                "userId": parseInt(localStorage.getItem("currentUser")),
                "freindId": foundUser.id
})
        }
}

    return (
        <form id="friendForm">
            <h2 className="friendForm__title">New Friend</h2>
            <div className="form-group">
                <label htmlFor="friendCheck">Check</label>
                <input
                    type="text"
                    id="friendCheck"
                    ref={friendCheck}
                    required
                    autoFocus
                    className="form-control"
                    placeholder="Check"
                />
            </div>
            <button type="submit"
                onClick={
                    evt => {
                        evt.preventDefault() // Prevent browser from submitting the form
                        constructNewFriend()
                    }
                }
                className="btn btn-primary">
                Save Friend
            </button>
        </form>
    )
}