import React, { useState, useEffect } from "react"
import "./Player.css"

//object references
const player = document.getElementById("player")
const muteButton = document.getElementById("muteButton")
const seekSlider = document.getElementById("seekSlider")
const volumeSlider = document.getElementById("volumeSlider")
let seeking = Boolean

//functions
//play and pause
const playPause = () => {
    if (player.paused()) {
        player.play()
    } else {
        player.pause()
    }
}
// mute
const mute = () => {
    if (player.muted) {
        player.muted = false
    } else {
        player.muted = true
    }
}

const setVolume = () => {
    player.volume = volumeSlider.value / 100
}

// const seek = () => {
//     if (seeking) {
//         seekSlider.value = event.clientX - seekSlider.offsetLeft
//         let seekTo = player.duration * (seekSlider.value / 100)
//         player.currentTime = seekTo
//     }
// }

const calculateTimeValue = (length) => {
    var minutes = Math.floor(length / 60),
        seconds_int = length - minutes * 60,
        seconds_str = seconds_int.toString(),
        seconds = seconds_str.substr(0, 2),
        time = minutes + ':' + seconds

    return time
}

const calculateCurrentValue = (currentTime) => {
    var current_hour = parseInt(currentTime / 3600) % 24,
        current_minute = parseInt(currentTime / 60) % 60,
        current_seconds_long = currentTime % 60,
        current_seconds = current_seconds_long.toFixed(),
        current_time = (current_minute < 10 ? "0" + current_minute : current_minute) + ":" + (current_seconds < 10 ? "0" + current_seconds : current_seconds)

    return current_time
}



export default (props) => {

    const [songPosition, setSongPosition] = useState()

    // const getSongPosition = () => {

    //     return setSongPosition("")
    // }

    const updateSongPosition = (time) => {

        return setSongPosition(time)
    }

    useEffect(() => {
        // updateSongPosition()
        updateSongPosition(setSongPosition)
    }, [])

    useEffect(() => {
        // console.log("****  SONG POSITION STATE CHANGED  ****")
        // console.log(songPosition)
    }, [songPosition])

    const [songVolume, setSongVolume] = useState()

    const updateSongVolume = (level) => {

        return setSongVolume(level)
    }

    useEffect(() => {
        // updateSongPosition()
        updateSongVolume(setSongVolume)
    }, [])

    useEffect(() => {
        // console.log("****  SONG VOLUME STATE CHANGED  ****")
        // console.log(songVolume)
    }, [songVolume])
    
    return (

        <div className="player">
            <div id="content">
                <img className="profilePicture" src=""></img>

                <audio autoPlay id="player" onTimeUpdate={() => {
                    const player = document.getElementById("player")
                    const time = player.currentTime / 2
                    // console.log(time)
                    updateSongPosition(time)
                }}>
                    <source src="" type="audio/mpeg" id="songPlayer" />
                    Error.
            </audio>

                <div className="playerWindow">
                    <button id="pauseButton" title="Play/Pause" onClick={() => {
                        const player = document.getElementById("player")

                        if (player.paused) {
                            player.play()
                        } else {
                            player.pause()
                        }
                    }}>
                        <img className="playButtonIcon" src="https://firebasestorage.googleapis.com/v0/b/hifi-ed258.appspot.com/o/images%2FPlayButton3.png?alt=media&token=16374b88-23e6-4c1a-843a-ed22878773f2" alt="playButtonIcon"></img>
                    </button>

                    <button id="muteButton" onClick={() => {
                        const player = document.getElementById("player")

                        if (player.muted) {
                            player.muted = false
                        } else {
                            player.muted = true
                        }
                    }}><img className="muteButtonIcon" src="https://firebasestorage.googleapis.com/v0/b/hifi-ed258.appspot.com/o/images%2FmuteButtonColored.png?alt=media&token=f39ce46e-c695-4415-b086-5a1ce26769da" alt="muteButtonIcon"></img></button>

                {/* <div id="playerTime">{() => {
                const player = document.getElementById("player")
                
                return console.log(player.currentTime)}}</div> */}

                <span id="seekValue">{() => {
                                        const player = document.getElementById("player")
                return player.currentTime}}</span>
                    <input id="seekSlider" type="range" min="0" max="100" step="1" onMouseDown={() => {

                        seeking = true
                        // const updateSongPosition = () => {
                        //     console.log("**** Song Position Changed  ****")
                        // }
                        // updateSongPosition()
                    }} onMouseUp={() => seeking = false} value={songPosition} onChange={() => {

                        //Display the seek value on the screen
                        const player = document.getElementById("player")
                        const slider = document.getElementById("seekSlider")
                        const seekOutput = document.getElementById("seekValue")
                        // seekOutput.innerHTML = player.currentTime
                        //Seek through song
                        slider.onchange = () => seekOutput.innerHTML = player.currentTime
                        const seek = (event) => slider.value = event.clientX - slider.offsetLeft
                        const seekTo = player.duration * (slider.value / 100)
                        //Don't use infinite values
                        if (isFinite(seekTo)) {
                            player.currentTime = seekTo
                        }
                        seek(seekOutput)
                        slider.onchange(slider.value = player.currentTime)
                    }}></input>

                    <span id="volumeLevel">Volume:
                    <span id="volumeValue"></span>
                    </span>
                    <input id="volumeSlider" type="range" min="0" max="100" defaultValue="75" step="1" onChange={() => {

                        const player = document.getElementById("player")
                        const volumeSlider = document.getElementById("volumeSlider")
                        player.volume = Math.min(volumeSlider.value / 100);
                        const volumeOutput = document.getElementById("volumeValue")
                        //multiply by floating point value then round to nearest whole number
                        volumeOutput.innerHTML = ' ' + Math.floor(player.volume * 100)
                    }}></input>
                </div>
            </div>
        </div>

    )
}