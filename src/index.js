import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import HiFi from "./components/HiFi"

import firebaseConfig from './config/firebaseConfig';
import * as firebase from "firebase/app"
firebase.initializeApp(firebaseConfig)

ReactDOM.render(
    <Router>
        <HiFi />
    </Router>
    , document.getElementById("root"))
