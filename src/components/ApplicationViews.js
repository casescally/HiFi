import React from "react";
import { Route } from "react-router-dom";

import { SongProvider } from "./song/SongProvider";

import SongList from "./song/SongList";

import Profile from "./profile/Profile";

import SongForm from "./song/SongForm";

import { UserProvider } from "./user/UserProvider"

import SongDetails from "./song/SongDetails"

export default props => {
    return (
        <>
            <SongProvider>
                <UserProvider>   
                <Route exact path="/" render={
                            props => <Profile {...props} />
                        } />                
                </UserProvider>
            </SongProvider>

            <SongProvider>
                <UserProvider>   
                <Route exact path="songs/create" render={
                            props => <SongForm {...props} />
                        } />                
                </UserProvider>
            </SongProvider>

            <SongProvider>
                <UserProvider>
                        <Route exact path="/songs" render={
                            props => <SongList {...props} />
                        } />
                        <Route exact path="/songs/create" render={
                            props => <SongForm {...props} />
                        } />
                        <Route path="/songs/:songId(\d+)" render={
                            props => <SongDetails {...props} />
                        } />
                        <Route path="/songs/edit/:songId(\d+)" render={
                            props => <SongForm {...props} />
                        } />
                </UserProvider>
            </SongProvider>
        </>
    );
};

