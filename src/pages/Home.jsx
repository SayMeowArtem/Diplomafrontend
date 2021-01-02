import React from 'react';
import { Route } from 'react-router-dom';
import { Header } from '../components';
import FeedPage from './FeedPage';
import MyPlaylists from './MyPlaylists';
import MyProfile from './MyProfile';
import MyVideos from './MyVideos';
import { ProfileForVisit } from './ProfileForVisit';
import SubscribePage from './SubscribePage';
import UsersPage from './UsersPage';
import VideoPage from './VideoPage';
import ChartPage from './ChartPage';


export const Home = () => {
    return (
    <div>
        <Header />

   
{/* 
        <Route path={['/home','/home/myplaylists']}>
        
        </Route> */}

        <Route path="/home/myplaylists" exact>
            <MyPlaylists />
        </Route>

        <Route path="/home/myplaylists/:id" exact>
            <MyVideos />
        </Route>

        <Route path="/home/videos/:id" exact>
            <VideoPage />
        </Route>

        <Route path="/home/users" exact>
            <UsersPage />
        </Route>

        <Route path="/home/myprofile" component={MyProfile} exact />
 
        <Route path="/home/feed" component={FeedPage} exact />

        <Route path="/home/profile/:id" exact>
            <ProfileForVisit />
        </Route>


        <Route path="/home/mysubscribes" component={SubscribePage} exact/>
            
        <Route path="/home/stat" component={ChartPage} exact/>

    </div>
    )
}
