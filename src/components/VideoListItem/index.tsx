import React, { KeyboardEvent, useState } from 'react'

import styles from './VideoListItem.module.scss';
import like from './../../assets/img/like.png';
import comments from './../../assets/img/comments.png';
import Views from './../../assets/img/views.png';
// import { formatDate } from '../../utils/formatDate';
import { format } from 'date-fns';
import SimplePopover from '../Popover';
import { useDispatch } from 'react-redux';
import { fetchDeleteVideos, fetchUpdateVideos } from '../../store/ducks/videos/ActionCreators';
import { TextField } from '@material-ui/core';
import { AnyAaaaRecord } from 'dns';
import { Link } from 'react-router-dom';

interface VideoListItemInterface  {
    _id: string,
    title: string,
    url: string,
    likes: string,
    views: string,
    createdAt: string,
    commentsCount: string,
    isMy: boolean
}

const VideoListItem = ({_id,title, commentsCount, isMy, url, likes = "0", views = "0", createdAt}: VideoListItemInterface) => {
    

    const [editMode, seteditMode] = useState(false);
    const [updateTitle, setUpdateTitle] = useState('');


    const handleUpdateTitle = (e: any) => {
        setUpdateTitle(e.target.value);

    
    }

    const handleKeyPressed = (e: any) => {
        if (e.key === 'Enter') {
            if (e.target.value.length >= 3 && e.target.value.length <=45) {
                const obj = {
                    id: _id,
                    title: updateTitle
                }
                dispatch(fetchUpdateVideos(obj));
                seteditMode(false);

            }
            
        }
    }


    const dispatch = useDispatch();

    const stopEditMode = () => {
        seteditMode(false);
    }
    const handleEditMode = () => {
        seteditMode(true);
    }
    const handleDelete = () => {
     
       dispatch(fetchDeleteVideos(_id));
    }


    return (
        <div className={styles.MyVideos_item}>
        <div className={styles.MyVideos_item_char}>
                {editMode ? <TextField  defaultValue={title} onKeyPress={handleKeyPressed} onChange={handleUpdateTitle}  className={styles.Edit_text}/> : <Link className={styles.linkVideo} to={"/home/videos/" + _id}> {title}</Link>}
        </div>
        {/* <div className={styles.MyVideos_item_char}>
            <img className={styles.MyVideos_item_likeimg} src={like}/>
            <span className={styles.MyVideos_item_likespan}>
                {`Нравится: ${likes}`}
            </span>
        </div> */}
        <div className={styles.MyVideos_item_char}>
             <img className={styles.MyVideos_item_likeimg} src={comments}/>
            <span className={styles.MyVideos_item_likespan}>
            {`Комментарии: ${commentsCount}`}
            </span>
            
        </div>
        <div className={styles.MyVideos_item_char}>
            <img className={styles.MyVideos_item_likeimg} src={Views}/>
            <span className={styles.MyVideos_item_likespan}>
            {`Просмотры: ${views}`}
            </span>
           
        </div>
        <div className={styles.MyVideos_item_char}>
            { createdAt ? format(new Date(createdAt), 'dd.MM.yyyy') : format(new Date(), 'dd.MM.yyyy')}
        </div>
        
        {isMy ? <SimplePopover editMode={editMode}  stopEdit={ () => stopEditMode()} onEdit={ () => handleEditMode()} onDelete={() => handleDelete()}/> : ""} 
        
    </div>
    )
}

export default VideoListItem;
