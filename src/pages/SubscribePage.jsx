import React from 'react'
import { Button, createStyles, makeStyles,TextField,Theme } from '@material-ui/core'
import { Typography} from '@material-ui/core';

import { SubscribeItem } from '../components/SubscribeItem';
import { subscribeApi } from '../api/subscribeApi';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },
    container: {
        maxWidth: '1300px',
        margin: '0px auto'
    },
    Header: {
        marginTop: '50px'
    },
    Header_title: {
       fontWeight: '500',
       fontSize: '26px',
       lineHeight: '20px',
       fontFamily: 'Roboto Condensed'
    },
    subscribe_items: {
        marginTop: '20px',
        display: 'flex',
        flexWrap: 'wrap'
    },
  }),
);

const SubscribePage = () => {


    const classes = useStyles();
    console.log("RERENDER");
    const [state, setState] = React.useCallback(React.useState({
        users: undefined,
    }));


   


    React.useEffect(() => {
        subscribeApi.GetMySubscribe().then( res => setState({
            users: res.data
        }));
  
     }, [])

 


  

  

 

    return (
        <div className={classes.container}>
            <div className={classes.Header}>
            <Typography className={classes.Header_title}> 
               Мои подписки
             </Typography>
            </div>
            <div className={classes.subscribe_items}>

                {state.users && state.users.length > 0 ? state.users.map( el => <SubscribeItem  key={el.author._id + 599} _id={el.author._id} avatar={el.author.avatar} fullname={el.author.fullname} username={el.author.username}/>)
                 : "Вы не подписаны на авторов."}
            </div>
        </div>
    )
}

export default SubscribePage
