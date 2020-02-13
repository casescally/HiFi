import React, { useState, useEffect } from "react"

/*
    The context is imported and used by individual components
    that need data
*/

export const SongContext = React.createContext()

/*
 This component establishes what data can be used.
 */

export const SongProvider = (props) => {

    const [songs, setSongs] = useState([])

    const getSongs = () => {
        return fetch("http://localhost:8088/songs")
            .then(res => res.json())
            .then(setSongs)
    }

    const addSong = song => {
        return fetch("http://localhost:8088/songs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(song)
        })
            .then(getSongs)
    }

     const deleteSong = song => {
        return fetch(`http://localhost:8088/songs/${song.id}`, {
            method: "DELETE"
        })
        .then(getSongs)
    }

    const updateSong = song => {
        return fetch(`http://localhost:8088/songs/${song.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(song)
        })
            .then(getSongs)
    }

    const updateSongPlay = song => {
        return fetch(`http://localhost:8088/songs/${song.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(song)
        })
            .then(getSongs)
    }

    /*
        Load all songs when the component is mounted. Ensure that
        an empty array is the second argument to avoid infinite loop.
    */
   
    useEffect(() => {
        getSongs()
    }, [])

    useEffect(() => {
        console.log("****  SONG APPLICATION STATE CHANGED  ****")
        console.log(songs)
    }, [songs])

    return (
        <SongContext.Provider value={{
            songs, addSong, deleteSong, updateSong, updateSongPlay
        }}>
            {props.children}
        </SongContext.Provider>
    )
}