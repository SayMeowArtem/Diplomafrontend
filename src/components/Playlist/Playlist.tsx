import React, { useEffect, useState } from 'react'


import { Button, createStyles, makeStyles, TextField, Theme} from '@material-ui/core'

import styles from './Playlist.module.scss'
import SimplePopover from '../Popover'
import { fetchDletePlaylist, fetchUpdatePlaylist} from '../../store/ducks/playlists/actionCreators'
import { useDispatch } from 'react-redux'
import { FormState } from '../../store/ducks/playlists/contracts/state'
import { playlistsApi } from '../../api/playlistsApi'
import { Link } from 'react-router-dom'


interface PlaylistProps  {
    id: string;
    title: string;
    coverURL: string;
    isMy: boolean;
    owner: any;
    updateStatus: () => void;
    handleUpdateStatus:(s: boolean) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inputFile: {
       InputLabelProps: {
           color: '#ffffff'
       }
    }
  }),
);

const Playlist:React.FC<PlaylistProps> = ({
    id,
    title,
    coverURL,
    isMy,
  
    handleUpdateStatus 
}: PlaylistProps): React.ReactElement => {
    const dispatch = useDispatch();
    const [editMode, seteditMode] = useState(false);


    const [updateTitle, setUpdateTitle] = useState('');
    const [selectCoverUrl, setselectCoverUrl] = useState('');
   
  
   

    const uploadImage = async (e: any) => {
   
        try {
            const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'ArtemkaReact');
        const res = await fetch('https://api.cloudinary.com/v1_1/banancly123/image/upload', {
            method: 'POST',
            body: data,
          });
          const file = await res.json();
          setselectCoverUrl(String(file.secure_url));
          console.log(String(file.secure_url));
       
        } catch (error) {
            console.log(error);
        }
      }


    const handleDelete = (id: string) => {
       dispatch(fetchDletePlaylist(id));
    }
    const handleEditMode = () => {
        seteditMode(true);
    }
    const stopEditMode = () => {
        seteditMode(false);
        
    }



    const handleUpdateTitle = (e: any) => {
        setUpdateTitle(e.target.value);
    }

    const handleUpdate = () => {
        const obj = {
            id:id,
            title: updateTitle,
            coverURL: selectCoverUrl
        }
        console.log(obj);
        playlistsApi.UpdatePlaylist(obj);
        handleUpdateStatus(true);
        stopEditMode();


        //Костыль который нужно пофиксить
        // dispatch(fetchUpdatePlaylist(obj));
        
    }

    const classes = useStyles();
    return (
        <div className={styles.playlist_item}>
        <div className={styles.playlist_item_title}>
            {editMode ? <TextField defaultValue={title} onChange={handleUpdateTitle}  className={styles.Edit_text}/> : title}
        </div>
        <div className={styles.playlist_item_cover_img}>
        {editMode ? 
        <>
        <div className={styles.input_div}>
            <img src={selectCoverUrl ? selectCoverUrl : coverURL} alt=""/>
        </div>
        <input className={styles.input}  onChange={uploadImage} type="file"  />
        </>
        : <img src={coverURL} alt=""/>}
        </div>
        {editMode ? <Button onClick={() => handleUpdate()}  className={styles.playlist_item_btn} variant="contained" color="primary" fullWidth >Изменить</Button>
         : 
         <Link to={"/home/myplaylists/" + id}>
             <Button className={styles.playlist_item_btn} variant="contained" color="primary" fullWidth>Перейти</Button>
         </Link>
         }
        

          {isMy  ?  <SimplePopover editMode={editMode}  stopEdit={ () => stopEditMode()} onEdit={ () => handleEditMode()} onDelete={() => handleDelete(id)}/>: ""}               
        </div>
    )
}

export default Playlist
