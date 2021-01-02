import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { Button, FormControl, FormGroup, TextField, Input, CircularProgress, Typography, Checkbox, FormControlLabel  } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";



//@ts-ignore
import styles from './ModalAddPlaylist.modal.scss';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAddPlaylist } from '../../store/ducks/playlists/actionCreators';
import { fetchAddVideos } from '../../store/ducks/videos/ActionCreators';
import { Notification } from '../Notification';
import { Alert } from '@material-ui/lab';
import classNames from 'classnames';
import { Snackbar } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      borderRadius: 10
    },
    uploadfiles: {
      marginTop: 15,
    },
    uploadfileText: {
      marginLeft: 15,
      textTransform: 'none'
    },
    checkbox: {
      color: 'rgba(0, 0, 0, 0.8)',
      
      '& .MuiTypography-body1': {
        fontFamily: 'Roboto Condensed',
      },
      '& .MuiFormControlLabel-root': {
        fontFamily: 'Roboto Condensed',
      }
      
    }
  }),
);

interface FadeProps {
  children?: React.ReactElement;
  in: boolean;
  onEnter?: () => {};
  onExited?: () => {};
}



interface ModalProps {
  open: boolean;
  type: string;
  onClose: () => void;
}

export interface AddFormProps {
  title: string;
  nameVideo: string;
  discription: string;
  coverURL: string;
  urlVideo: string;
  playlist: string;
  url: string;
}

const AddFormSchema = yup.object().shape({
  title: yup.string().min(3, '​Минимальная длина 3 символа').required('Введите название плейлиста'),
});

export default function ModalAddPlaylist({open, handleClose, type } : any): React.ReactElement {
  const classes = useStyles();

   const dispatch = useDispatch();
    const [selectCoverUrl, setselectCoverUrl] = useState('');
    const [statusUpload, setstatusUpload] = useState(true);
    const [error, seterror] = useState(false);
    const [flagModal, setflagModal] = useState('');
    const [statusUploading, setstatusUploading] = useState(false);
     const [isVideourl, setisVideourl] = useState(false);
  

  const {control, handleSubmit, errors} = useForm<AddFormProps>({
    resolver: yupResolver(AddFormSchema)
})
  
  const onSubmit = (data: AddFormProps) => {
  
      data.coverURL = selectCoverUrl;
  
   
    if (data.coverURL.length > 9) {
      dispatch(fetchAddPlaylist(data));
      setselectCoverUrl('');
      handleClose();
    }
    

 
  }

  const onRenderedPlaylist = () => {
    setflagModal('AddPlaylist');
  }

  const onRenderedVideos = () => {
    setflagModal('AddVideo');
  }


  const onSubmitVideos = (data: AddFormProps) => {
    console.log(13213);
    console.log(isVideourl);
    console.log(data.urlVideo);
    if (isVideourl) {
      data.url = data.urlVideo;
    }
    else {
      data.url = selectCoverUrl;
    }

    const searchString =  window.location.href;
    const playlistID = searchString.split('/')[5];
    data.playlist = playlistID;
  
    //@ts-ignore
    if (data.url) {
      dispatch(fetchAddVideos(data));
      setselectCoverUrl('');
      handleClose();
     
    }
  }
  
 const uploadImage = async (e: any) => {
    try {
     
        const files = e.target.files;
        const data = new FormData();
        let urlUpload = '';

        if (flagModal === 'AddVideo') {
          urlUpload = 'video'
        }
        else if (flagModal === 'AddPlaylist') {
          urlUpload = 'image'
        }
      
        setstatusUploading(true);
    data.append('file', files[0]);
    data.append('upload_preset', 'ArtemkaReact');
    const res = await fetch(`https://api.cloudinary.com/v1_1/banancly123/${urlUpload}/upload`, {
        method: 'POST',
        body: data,
      });
      console.log(res);
      if (res.ok) {
        const file = await res.json();
        if (file) {
          setstatusUpload(false)
          setselectCoverUrl(String(file.secure_url));
          setstatusUploading(false);
          
        }
      }
      else {
        seterror(true);
        setstatusUploading(false);
        setTimeout( () => seterror(false), 2000);
        
      }
     
  
   
    } catch (error) {
        console.log(error);
    }
  }
  
  return (
    <>
    <Snackbar open={error} anchorOrigin={{  vertical: 'top',
          horizontal: 'center' }}>
      <Alert severity="error" >{flagModal === 'AddPlaylist' ? "Неверный формат файла. Загрузите изображение jpg/png/gif." : "Неверный формат файла. Загрузите видео."}</Alert>
    </Snackbar>
    
    {type === 'AddPlaylist' ? <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onRendered={onRenderedPlaylist}
        onClose={handleClose}
        
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
          <div className={classes.paper}>
          
          
          <form className={styles.addplaylist_form} onSubmit={handleSubmit(onSubmit)}>
              <FormControl  component="fieldset" fullWidth>
                <FormGroup aria-label="position" row>
                  <Controller
                    as={TextField}
                    control={control}
                    name="title"
                    id="title"
                    label="Название"
                    type="text"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                    defaultValue=""
                     helperText={errors.title?.message}
                     error={!!errors.title}
                    fullWidth
                    autoFocus
                  />
                    <Controller
                    as={<TextField onInput={uploadImage}/>}
                    control={control}
                    name="coverURL"
                    id="coverURL"
                    label="Превью плейлиста"
                    className={classes.uploadfiles}
                    type="file"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={
                      {
                        accept: "image/*"
                      }
                    }
                    variant="filled"
                    defaultValue=""
                     helperText={errors.coverURL?.message}
                     error={!!errors.coverURL}
                    fullWidth
                    autoFocus
                  />
                        
                   
                  <Button   disabled={statusUpload} type="submit" className={classes.uploadfiles} variant="contained" color="primary" fullWidth>
                  {statusUploading ? <><CircularProgress size="20"/><div className={classes.uploadfileText}>Файл загружается...</div></>: "Добавить" } 
                  </Button>
        
                </FormGroup>
              </FormControl>
            </form>
            
          </div>
      </Modal>
    </div>
    :
    <div>
    <Modal
    aria-labelledby="spring-modal-title"
    aria-describedby="spring-modal-description"
    className={classes.modal}
    open={open}
    onClose={handleClose}
    onRendered={onRenderedVideos}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
  >
      <div className={classes.paper}>
      <form  className={styles.addplaylist_form} onSubmit={handleSubmit(onSubmitVideos)}>
          <FormControl  component="fieldset" fullWidth>
            <FormGroup aria-label="position" row>
              <Controller
         
                as={TextField}
                control={control}
                name="title"
                id="title"
                label="Название видео"
                type="text"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
                defaultValue=""
                 helperText={errors.title?.message}
                 error={!!errors.title}
                fullWidth
                autoFocus
              />
              <Controller
                as={<TextField multiline/>}
                control={control}
                name="discription"
                id="discription"
                label="Описание видео"
                type="text"
              
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
                defaultValue=""
                 helperText={errors.title?.message}
                 error={!!errors.title}
                fullWidth
                autoFocus
              />
              { isVideourl ?         <Controller
         
         as={TextField}
         control={control}
         name="urlVideo"
         id="urlVideo"
         label="ID видео с youtube.com"
         type="text"
         InputLabelProps={{
           shrink: true,
         }}
         variant="filled"
         defaultValue=""
          helperText={errors.title?.message}
          error={!!errors.title}
         fullWidth
         autoFocus
       />:   <Controller
       //@ts-ignore
       as={<TextField   onInput={uploadImage}/>}
       control={control}
       name="url"
       id="url"
       label="Загружаемое видео"
       className={classes.uploadfiles}
       type="file"
       InputLabelProps={{
         shrink: true,
       }}
       InputProps={
         {
           accept: "videos/*"
         }
       }
       variant="filled"
       defaultValue=""
        helperText={errors.coverURL?.message}
        error={!!errors.coverURL}
       fullWidth
       autoFocus
     />}
             
                    
                <FormControlLabel
                  className={classes.checkbox}
                  id="videofromurl"

                  control={
                    <Checkbox
                      name="checkedB"
                      color="primary"
                      checked={isVideourl}
                      onChange={ () => setisVideourl(!isVideourl)}
                    />
                  }
                  label="Добавить видео с youtube.com"
                />
              <Button disabled={ isVideourl ? false : statusUpload} type="submit" className={classes.uploadfiles} variant="contained" color="primary" fullWidth>
                 {statusUploading ? <><CircularProgress size="20"/><div className={classes.uploadfileText}>Файл загружается...</div></>: "Добавить" } 
              
               
              </Button>
    
            </FormGroup>
          </FormControl>
        </form>
        
      </div>
  </Modal>
</div>
  }
  
    </>
  );
}