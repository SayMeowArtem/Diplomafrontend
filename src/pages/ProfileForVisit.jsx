import React from 'react'

import { Button, createStyles, makeStyles, Snackbar, TextField, Theme } from '@material-ui/core'
import styles from './ProfileForVisit.module.scss'
import { Alert } from '@material-ui/lab';
import avatar from '../assets/img/avatar.png';
import views from '../assets/img/views.png';
import subscriber from '../assets/img/subscriber.png';
import { AuthApi } from '../api/authApi';
import Playlist from '../components/Playlist/Playlist';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserData } from '../store/ducks/user/selectors';
import { SelectSubscribes } from '../store/ducks/subscribes/selectors';
import { FetchAddSubscribe, FetchDeleteSubscribe, FetchSetSubscribes } from './../store/ducks/subscribes/actionCreators';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },
    info_param: {
        marginTop: '10px'
    },
    info_param_items: {
        marginTop: '10px'
    },
    info_param_item: {
        maxWidth: '270px',
        background: '#1C1C24',
        borderRadius: '15px',
        padding: '15px',
        display: 'flex',
        marginBottom: '10px'
    },
    info_param_item_icon: {
        marginRight: '10px',
        '& img': {
            width: '40px',
            height: '40px',
            objectFit: 'cover'
        }
    },
    info_param_item_text: {
       
    },
    info_param_item_number: {
        fontSize: '18px',
        lineHeight: '20px'
    },
    info_param_item_title: {
        marginTop: '5px',
        color: '#5F5F6E',
        fontSize: '16px'
    }
  }),
);

export const ProfileForVisit = () => {
    const searchString =  window.location.href;
    const userID = searchString.split('/')[5];
    const dispatch  = useDispatch();
    const userData  = useSelector(selectUserData);
    let myID;
    if (userData){
        myID = userData._id
    }
    const classes = useStyles();
    const [show, setshow] = React.useState(false);
    const [infoProfile, setinfoProfile] = React.useState({ 
        views: undefined,
        subscribers: undefined,
        playlists: undefined,
        userInfo: {
            fullname: undefined,
            discription: undefined,
            username: undefined,
            avatar: undefined
        },
    });

    const [Loadingstate, setLoadingstate] = React.useState('false')

    React.useEffect( () => {
      AuthApi.GetInfoUser(userID).then( res => setinfoProfile({
        views: res.data.views,
        subscribers: res.data.subscribers,
        playlists: res.data.playlists,
        userInfo: res.data.userInfo
    }));
    setLoadingstate(true);
    }, [])
        const playlistItems = infoProfile.playlists && infoProfile.playlists.map( item => <Playlist  key={item._id + 123132}   isMy={myID === item.owner._id} id={item._id} title={item.title} coverURL={item.coverURL}/>).reverse();
     
        const subscribes = useSelector(SelectSubscribes);

        const checkSubscribe = (_id) => {
            const check = subscribes.find(el => el.author === _id) ? true : false;
            return check
        }

        let subscribeItem = {
            author: infoProfile.userInfo._id,
            subscriber: myID
          }


        const handleAddSubscribe = () => {
            dispatch(FetchAddSubscribe(subscribeItem))
            dispatch(FetchSetSubscribes(null));
            setshow(true);
            setTimeout( () => setshow(false), 2000);
        }
        
        const handleDeleteSubscribe = () => {
            dispatch(FetchDeleteSubscribe(subscribeItem));
            check = true;
        }
        let check = checkSubscribe(infoProfile.userInfo._id);

    return (
        <>
        <div className={styles.container}>
         
        <div className="Profile">
            <div className={styles.Profile_header} >
                {`Профиль ${infoProfile.userInfo.username}`}
            </div>
            <div className={styles.ProfileVisit}>
                <div className="own_info">
                <div className={styles.Profile_photo}>
                    <img src={infoProfile.userInfo.avatar ? infoProfile.userInfo.avatar : avatar} alt=""/>
                </div>
                <div className={styles.Profile_subscribe_btn}>
                 { !check ? <Button fullWidth variant="contained" color="secondary" onClick={() => handleAddSubscribe() }>Подписаться</Button> : 
                 <Button fullWidth variant="contained" color="default" onClick={() => handleDeleteSubscribe() }>Отписаться</Button>}
                </div>
                <div className={styles.Profile_discription}>
                    <div className={styles.Profile_discription_title}>
                     Описание канала:
                    </div>
                    <div className={styles.Profile_discription_text}>
                     {infoProfile.userInfo.discription ? infoProfile.userInfo.discription : 'Описание отсутствует.'}
                    </div>
                </div>
                <div className={styles.Profile_fullnameblock}>
                    <div className={styles.Profile_fullnameblock_title}>
                     Автор:
                    </div>
                    <div className={styles.Profile_fullnameblock_name}>
                       {infoProfile.userInfo.fullname}
                    </div>
                </div>
                <div className={classes.info_param}>
                        <div className={classes.inputs_block_item_title}>
                            Общие данные:
                        </div>
                        <div className={classes.info_param_items}>
                            <div className={classes.info_param_item}>
                                <div className={classes.info_param_item_icon}>
                                    <img src={views} alt=""/>
                                </div>
                                <div className={classes.info_param_item_text}>
                                    <div className={classes.info_param_item_number}>
                                        {infoProfile.views ? infoProfile.views : "0"}
                                    </div>
                                    <div className={classes.info_param_item_title}>
                                        Просмотры видео автора
                                    </div>
                                </div>
                            </div>
                            <div className={classes.info_param_item}>
                                <div className={classes.info_param_item_icon}>
                                    <img src={subscriber} alt=""/>
                                </div>
                                <div className={classes.info_param_item_text}>
                                    <div className={classes.info_param_item_number}>
                                    {infoProfile.subscribers ? infoProfile.subscribers : "0"}
                                    </div>
                                    <div className={classes.info_param_item_title}>
                                        Количество подписчиков
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>


               
                </div>
                <div className="playlists">
                    <div className={styles.title_playlists}>
                        Плейлисты автора
                    </div>
                    <div className={styles.playlist_items}>
                    {playlistItems && playlistItems.length > 0 ? playlistItems : "В данный момент у автора отсутствуют плейлисты."}
                    </div>
                </div>
            </div>
        </div>
        </div>
        <Snackbar open={show} anchorOrigin={{  vertical: 'top',
          horizontal: 'center' }}>
      <Alert severity="success" >Вы успешно подписались на автора: {infoProfile.userInfo.username}</Alert>
    </Snackbar>
        </>
    )
}
