import React from "react";
import { Route } from "react-router-dom";
import { SongProvider } from "./song/SongProvider";
import { UserProvider } from "./user/UserProvider"
import { LikeProvider } from "./likes/LikesProvider"
import Profile from "./profile/Profile";
import Discover from "./discover/Discover";
import SongForm from "./song/SongForm";
import SongDetails from "./song/SongDetails";
import Stream from "./stream/Stream";
import { FollowerProvider } from "./follower/FollowerProvider";
import Player from "./player/Player"

export default props => {
    return (
        <>
            <SongProvider>
                <FollowerProvider>
                    <UserProvider>
                        <LikeProvider>
                            <Route exact path="/" render={
                                props => <Discover {...props} />
                            } />

                            <Route exact path="/users/:userId(\d+)" render={
                                props => <Profile {...props} />
                            } />

                            <Route path="/stream" render={
                                props => <Stream {...props} />
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
                            <Player></Player>
                        </LikeProvider>
                    </UserProvider>
                </FollowerProvider>
            </SongProvider>
        </>
    );
};

