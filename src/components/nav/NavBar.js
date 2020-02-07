import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export default (props) => {
    return (
        <ul className="navbar">

            <li className="navbar__item discover">
                <Link className="navbar__link" to="/discover">Discover</Link>
            </li>

            <li className="navbar__item stream">
                <Link className="navbar__link" to="/stream">Stream</Link>
            </li>

            <li className="navbar__item stream">
                <Link className="navbar__link" to="/">Profile</Link>
            </li>
        
            <li className="navbar__item upload">
                <button onClick={() => props.history.push("/songs/create")}>
                    Upload Song
                </button>
            </li>

            {
                localStorage.getItem("currentUser")
                    ? <li className="navbar__item">
                        <Link className="navbar__link"
                            to=""
                            onClick={e => {
                                e.preventDefault()
                                localStorage.removeItem("currentUser")
                                props.history.push("/")
                            }}
                        >Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}