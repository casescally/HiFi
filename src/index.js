import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import HiFi from "./components/HiFi"

ReactDOM.render(
    <Router>
        <HiFi />
    </Router>
    , document.getElementById("root"))
