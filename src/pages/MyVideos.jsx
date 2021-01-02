import React from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { Typography, IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ModalAddPlaylist from '../components/ModalAddPlaylist';
import { fetchSetVideos } from '../store/ducks/videos/ActionCreators';
import { SelectVideos, SelectVideosState } from '../store/ducks/videos/selectors';
import VideoListItem from '../components/VideoListItem';


import styles from './MyVideos.module.scss';
import { selectUserData } from '../store/ducks/user/selectors';




const MyVideos = () => {
    const searchString =  window.location.href;
    const playlistID = searchString.split('/')[5];

    const items = useSelector(SelectVideos);
    const LoadingStatus = useSelector(SelectVideosState);

    const userData  = useSelector(selectUserData);
    let myId;
    if (userData){
        myId = userData._id
    }


    const [modalAdd, setmodalAdd] = React.useState(false);
    
    const handleOpen = () => {
        setmodalAdd(true);
      };
    
      const handleClose = () => {
        setmodalAdd(false);
      };

    const dispatch = useDispatch();

        React.useEffect( () => {
            dispatch(fetchSetVideos(playlistID));
        }, [modalAdd])
        // videosApi.getVideosbyID(playlistID).then( data => {
        //     console.log(data);
        // });
  
    

    return (
        <div>
            <div className={styles.container}>
            <div className={styles.MyPlaylists_header}>
                    <Typography className={styles.MyPlaylists_header_text}> 
                         Содержание курса
                    </Typography>
                    <ModalAddPlaylist type="AddVideo" open={modalAdd} handleClose={handleClose}/>
                   <IconButton onClick={ () => handleOpen()} className={styles.Add_new_course} color="primary">
                       <AddCircleIcon />
                   </IconButton>
            </div>

            <div className={styles.MyVideos_items}>
                {items && items.length > 0 ? items.map( el => <VideoListItem isMy={myId === el.owner}  key={el._id + 13132} _id={el._id} commentsCount={el.commentsCount} title={el.title} url={el.url} createdAt={el.createdAt} likes={el.likes} views={el.views}/> ) 
                : <div>Видео в данном плейлисте отсутствуют.</div>}
            </div>
            </div>
        </div>
    )
}

export default MyVideos
