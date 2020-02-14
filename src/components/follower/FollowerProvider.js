import React, { useState, useEffect } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const FollowerContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const FollowerProvider = (props) => {
    const [followers, setFollowers] = useState([])

    const getFollowers = () => {
        return fetch("http://localhost:8088/followers")
            .then(res => res.json())
            .then(setFollowers)
    }

    const addFollower = follower => {
        return fetch("http://localhost:8088/followers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(follower)
        })
            .then(getFollowers)
    }

    const deleteFollower = follower => {
        return fetch(`http://localhost:8088/followers/${follower.id}`, {
            method: "DELETE"
        })
        .then(getFollowers)
    }
    
    /*
        Load all followers when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
    useEffect(() => {
        getFollowers()
    }, [])

    useEffect(() => {
        console.log("****  FOLLOWERS APPLICATION STATE CHANGED  ****")
        console.log(followers)
    }, [followers])

    return (
        <FollowerContext.Provider value={{
            followers, addFollower, deleteFollower
        }}>
            {props.children}
        </FollowerContext.Provider>
    )
}