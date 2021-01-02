import React, { useState } from 'react';
import { Button, createStyles, makeStyles, Snackbar, TextField, Theme } from '@material-ui/core'
import { PopularItem } from '../components/PopularItem';
import { playlistsApi } from '../api/playlistsApi';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },
     container: {
        maxWidth: '1300px',
        margin: '0px auto'
   },
   MostPopularBlock: {
        marginTop: '50px',
       
   },
   titleMostPopularBlock: {
       fontWeight: '500',
       fontSize: '26px',
       lineHeight: '20px',
       fontFamily: 'Roboto Condensed',
       marginBottom: '20px'
   },
   OurFeed: {
       display: 'flex',
       flexDirection: 'column',
       marginTop: '30px',
       justifyСontent: 'center',
       alignItems: 'center',
      
   },
   ourFeed_Title: {
    fontWeight: '500',
    fontSize: '26px',
    lineHeight: '20px',
    fontFamily: 'Roboto Condensed',
    marginBottom: '20px'
   },
   MostPupularItems: {
       display: 'flex'
   },
   ourFeedItems: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'

   }


  }),
);

const FeedPage = () => {
    const classes = useStyles();



    const [state, setstate] = useState({
        popularPlaylists: undefined,
    })

    const [newPlaylists, setnewPlaylists] = useState({
        newPlaylists: undefined,
    })
    
  
    React.useEffect( () => {
        playlistsApi.GetPopularPlaylists().then( res => {
            setstate({
                popularPlaylists: res.data
            })
        });
        playlistsApi.GetNewPlaylists().then( res => {
            setnewPlaylists({
                newPlaylists: res.data
            })
        }
          
        )
    }, [])

  
    return (
        <div className={classes.container}>
            <div className={classes.MostPopularBlock}>
                <div className={classes.titleMostPopularBlock}>
                    Популярные курсы LearnSpecial
                </div>
                <div className={classes.MostPupularItems}>
                    {state.popularPlaylists && state.popularPlaylists.map( item => <PopularItem _id={item._id} avatar={item.coverURL} createdAt={item.createdAt} title={item.title} views={item.popularity} username={item.owner.username}/>)}
                </div>
            </div>

            <div className={classes.OurFeed}>
                <div className={classes.ourFeed_Title}>
                    Новинки интересующих вас авторов
                </div>
                <div className={classes.ourFeedItems}>
                    {newPlaylists.newPlaylists && newPlaylists.newPlaylists.length > 0 ? newPlaylists.newPlaylists.map( item => <PopularItem _id={item._id} avatar={item.coverURL} createdAt={item.createdAt} title={item.title} views={item.popularity} username={item.owner.username}/>)
                    : "Вы не подписаны на авторов." }   
                </div>
            </div>
        </div>
    )
}

export default FeedPage
