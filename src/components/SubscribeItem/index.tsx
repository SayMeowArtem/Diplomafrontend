import React from 'react'
import { Button, createStyles, makeStyles,Theme } from '@material-ui/core'
import { Typography} from '@material-ui/core';
import avatarDefault from '../../assets/img/avatar.png';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },

    subscribe_item: {
        background: '#1C1C24',
        borderRadius: '15px',
        display: 'flex',
        padding: '20px',
        width: '260px',
        marginRight: '20px',
        marginBottom: '20px'
    },
    other_char: {
        marginLeft: '15px'
    },
    subscribe_item_topic: {
        marginBottom: '5px'
    },
    subscribe_item_topic_img: {
       '& img': {
           width: '100px',
           height: '100px',
           borderRadius: '50%',
           objectFit: 'cover'
       }
    },
    btn : {
        marginTop: '5px',
        textTransform: 'none'
    }
  }),
);

export const SubscribeItem = ({_id, fullname, avatar, username} : any) => {
    const classes = useStyles();


    return (
        <div className={classes.subscribe_item}>
        <div className={classes.subscribe_item_topic}>
            <div className={classes.subscribe_item_topic_img}>
                <img src={avatar ? avatar : avatarDefault}  alt=""/>
            </div>
        </div>
    <div className={classes.other_char}>
    <div className={classes.subscribe_item_topic}>
            Логин: <br /> {username}
        </div>
        <div className={classes.subscribe_item_topic}>
            Полное имя: <br /> {fullname}
        </div>
        <Link to={"/home/profile/" + _id}>
        <Button  variant="contained" color="primary" className={classes.btn}>Перейти</Button>    
        </Link>
    </div>
    
    </div>
    )
}
