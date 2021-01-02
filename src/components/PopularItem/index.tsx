import React from 'react'
import { Button, createStyles, makeStyles,  Theme } from '@material-ui/core'
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },
   PopularItem: {
       position: 'relative',
       maxWidth: '334px',
       background: '#1C1C24',
       borderRadius: '15px',
       padding: '15px',
       paddingBottom: '5px',
       marginRight: '10px',
       marginBottom: '10px'
   },
   PupularItemImg: {
    width: '305px',
    height: '190px',
    marginBottom: '5px',
    '& img': {
        width: '305px',
        height: '190px',
        objectFit: 'cover',
        borderRadius: '15px'
    }
   },
   PopularItem_text: {
    fontWeight: '500',
    fontSize: '20px',
    lineHeight: '24px',
    display: 'flex',
    color: '#FFFFFF'
   },
   author: {
    marginTop: '5px'
   },
   views: {
       marginTop: '5px'
   },
   date: {
       marginTop: '10px',
       color: '#A6ADB1',
       opacity: '0.7',
       fontSize: '16px',
       lineHeight: '20px'
   },
   btn: {
       position: 'absolute',
       bottom: '15px',
       right: '15px'
   }
   


  }),
);

export const PopularItem = ({_id, username, createdAt, avatar,  title, views}: any) => {
    const classes = useStyles();
    return (
 
        <div className={classes.PopularItem}>
        <div className={classes.PupularItemImg} >
            <img src={avatar} alt=""/>
        </div>
        <div className={classes.PopularItem_text}>
            {title}
        </div>
        <div className={classes.author}>
            Автор: {username}
        </div>
        <div className={classes.views}>
            Просмотры: {views}
        </div>
        <div className={classes.date}>
            {format(new Date(createdAt), 'dd.MM.yyyy')}
        </div>
        <Link to={"/home/myplaylists/" + _id}>
        <Button  variant="contained" color="primary" className={classes.btn}>Перейти</Button>    
</Link>
    </div>


    )
}
