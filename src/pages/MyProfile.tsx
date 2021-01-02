import { Button, createStyles, makeStyles, Snackbar, TextField, Theme } from '@material-ui/core'
import { Alert } from '@material-ui/lab';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import avatar from '../assets/img/avatar.png';
import { fetchUpdateUser } from '../store/ducks/user/actionCreators';
import { selectUserData } from '../store/ducks/user/selectors';
import styles from './MyProfile.module.scss'

import views from '../assets/img/views.png';
import subscriber from '../assets/img/subscriber.png';
import { AuthApi } from '../api/authApi';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },
    btn: {
        marginTop: '15px',
        marginBottom: '10px',
        textTransform: 'none'
    },
    input: {
        position: 'absolute',
        bottom:'20px',
        width: '250px !important',
        height: '36px !important',
        opacity: '0',
        zIndex: 1
    },
    textField: {
        background: '#2D2D3A',
        width: '430px',
        borderRadius: '15px',
        '& .MuiInputBase-input': {
            background: '#2D2D3A',
            color: '#ffffff',
            marginBottom: '0px',
            borderRadius: '15px',
            paddingLeft: '12px'
        },
        '& .MuiInput-underline:after': {
            bottom: '-10px',
            borderBottom: '1px solid #ffffff'
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottom: 'none'
        },
        '& .MuiInput-underline:before': {
            border: 'none'
        }
    },
    inputs_block_item_title: {
        marginBottom: '10px',
        color: '#5F5F6E',

        fontSize: '14px',
        lineHeight: '20px',
    },
    btn_submit: {
        marginTop: '30px',
        border: 'none',
        '& .MuiButton-root' : {
            color: 'none'
        },
        '& .MuiButton-label' : {
            color: '#ffffff',
            textTransform: 'none',
            fontSize: '16px',
            fontFamily: 'Roboto Condensed'
        },
        '& .MuiTouchRipple-root ': {
            border: '2px solid #4447E2',
            borderRadius: '15px',
           
        },
    },
    info_param: {
        marginLeft: '150px'
    },
    info_param_items: {
        marginTop: '10px'
    },
    info_param_item: {
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
    },
    inputs_block_item: {
        marginTop: '10px'
    }
  }),
);

export default function MyProfile() {

    
    const selectData = useSelector(selectUserData);
    let MyInfo;
    if (selectData){
        MyInfo = selectData
    }
    const dispatch = useDispatch();
    
    const [infoProfile, setinfoProfile] = React.useState({ 
        views: undefined,
        subscribers: undefined
    });

    React.useEffect( () => {
        AuthApi.GetInfoForProfile(null).then( res => setinfoProfile({
            views: res.data.views,
            subscribers: res.data.subscribers
        }));
    }, [])

  


    
    const [show, setshow] = React.useState(false);
    const handleUpdateFullname = (e: any) => {
        setfullname(e.target.value);
    }

    const handleUpdateDiscription = (e: any) => {
        setdiscription(e.target.value);
        console.log(discription);
    }

    const [selectCoverUrl, setselectCoverUrl] = React.useState('');
   
    const [fullname, setfullname] = React.useState(MyInfo?.fullname);
    const [discription, setdiscription] = React.useState(MyInfo?.discription);
   

    const handleUpdateProfile = () => {
        const obj = {
            fullname: fullname,
            discription: discription

        }
        console.log(obj);
        if (MyInfo?.fullname !== fullname) {
            dispatch(fetchUpdateUser(obj));
            setshow(true);
            setTimeout( () => setshow(false), 2000);
        }
        else if (MyInfo?.discription !== discription) {
            dispatch(fetchUpdateUser(obj));
            setshow(true);
            setTimeout( () => setshow(false), 2000);
        }
    
        
    }

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

           const obj = {
               avatar: file.secure_url
           }

          dispatch(fetchUpdateUser(obj));
          setshow(true);
          setTimeout( () => setshow(false), 2000);
        } catch (error) {
            console.log(error);
        }
      }

    const classes = useStyles();
    return (
      <>
        <div className={styles.container}>
            <div className="Profile">
                <div className={styles.Profile_header} >
                    Мой профиль {MyInfo?.username}
                </div>
                <div className={styles.Profile_info} >
                    <div className={styles.Profile_photoUpdate}>
                        <div className={styles.Profile_photoUpdate_img}>
                            <img src={MyInfo?.avatar ? MyInfo?.avatar : avatar} alt=""/>
                        </div>
                        <input type="file" onChange={uploadImage} className={classes.input} />
                        <Button  className={classes.btn} fullWidth variant="contained" color="primary" >Загрузить новое фото</Button>
                    </div>
                    <div className={styles.inputs_block}>
                         <div>
                             <div className={classes.inputs_block_item_title}>
                                Полное имя
                             </div>
                             <TextField onChange={handleUpdateFullname}  multiline defaultValue={MyInfo?.fullname ? MyInfo?.fullname : ''} className={classes.textField}/>

                         </div>
                         <div className={classes.inputs_block_item}>
                             <div className={classes.inputs_block_item_title}>
                                Описание канала
                             </div>
                             <TextField onChange={handleUpdateDiscription} multiline defaultValue={MyInfo?.discription ? MyInfo?.discription : ''} className={classes.textField}/>

                         </div>


                         <Button variant="outlined"  onClick={handleUpdateProfile} className={classes.btn_submit}>
                             Применить изменения
                         </Button>
                    </div>
                    <div className={classes.info_param}>
                        <div className={classes.inputs_block_item_title}>
                            Общие данные
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
                                        Количество просмотров на ваших видео
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
            </div>
        </div>
        <Snackbar open={show} anchorOrigin={{  vertical: 'top',
          horizontal: 'center' }}>
      <Alert severity="success" >Изменение прошло успешно</Alert>
    </Snackbar>
        </>
    )
}
