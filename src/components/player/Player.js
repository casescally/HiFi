import React, { useState, useEffect } from "react"

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

    //     return setSongPosition("90")
    // }

    const updateSongPosition = (time) => {

        return setSongPosition(time)
    }

    useEffect(() => {
        // updateSongPosition()
        updateSongPosition(setSongPosition)
        console.log(songPosition)
    }, [])

    useEffect(() => {
        // console.log("****  SONG POSITION STATE CHANGED  ****")
        // console.log(songPosition)
    }, [songPosition])

    return (
        
        <div className="player">
            <img className="profilePicture" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"></img>

            <audio autoPlay id="player" onTimeUpdate={() => {
                const player = document.getElementById("player")
                const time = player.currentTime

                updateSongPosition(time)}}>
                <source src="" type="audio/mpeg" id="songPlayer" />
                Error.
            </audio>


            <div className="playerWindow">
                <button id="pauseButton" onClick={() => {
                    const player = document.getElementById("player")

                    if (player.paused) {
                        player.play()
                    } else {
                        player.pause()
                    }
                }}>Play/Pause</button>

                <button id="muteButton" onClick={() => {
                    const player = document.getElementById("player")

                    if (player.muted) {
                        player.muted = false
                    } else {
                        player.muted = true
                    }
                }}>Mute</button>


                Value: <span id="seekValue"></span>
                <input id="seekSlider" type="range" min="0" max="100" step="1" onMouseDown={() => {
                
                seeking=true
                // const updateSongPosition = () => {
                //     console.log("songposition  ****")
                // }
                // updateSongPosition()
            }} onMouseUp={() => seeking=false} value={songPosition} onClick={() => {
                    
                    //Display the seek value on the screen
                    const player = document.getElementById("player")
                    const slider = document.getElementById("seekSlider")
                    const seekOutput = document.getElementById("seekValue")
                    seekOutput.innerHTML = player.currentTime
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

                Value: <span id="volumeValue"></span>
                Volume:
                <input id="volumeSlider" type="range" min="0" max="100" defaultValue="0" step="1" onChange={() => {

                const player = document.getElementById("player")
                const volumeSlider = document.getElementById("volumeSlider")
                const volumeOutput = document.getElementById("volumeValue")

                player.volume = volumeSlider.value / 100
                volumeSlider.onchange = () => volumeOutput.innerHTML = volumeSlider.value

                const currentVolume = (event) => volumeSlider.value = event.clientX - volumeSlider.offsetLeft
                currentVolume(volumeOutput)
                }}></input>

<div id="content"></div>

            </div>
        </div>

    )
}