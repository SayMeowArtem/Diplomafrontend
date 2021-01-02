import React from 'react'
import { AuthApi } from '../api/authApi';
import {createStyles, makeStyles, Theme } from '@material-ui/core'
import { Redirect, useHistory } from 'react-router-dom';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import BlockIcon from '@material-ui/icons/Block';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },
     container: {
        maxWidth: '1300px',
        margin: '0px auto'
   },
   icon: {
       color: 'green',
       marginBottom: '10px'
   },
   iconfail: {
    color: 'red',
    marginBottom: '10px'
},
   group: {
       textAlign: 'center',
       marginTop: '25%'
   },
   text: {
        fontSize: '20px'
   }
 


  }),
);

const VerifyPage = () => {
    const classes = useStyles();
    const history = useHistory();
    const [verified, setverified] = React.useState(false);
    const hash= window.location.search.split("hash=")[1];

    React.useEffect(() => {
       if (hash){
           AuthApi.Verify(hash).then( 
                res => {
                    if (res.status === "success"){
                        setverified(true);
                     
                    }

                    
               
                }

           )
           setTimeout( () => {
            history.push('/');
        }, 3000)
       }

    }, [])

    return (
        <div>
            <div className={classes.container}>
                {verified ?  <div className={classes.group}>
                    <div className={classes.icon}>
                     <CheckCircleIcon fontSize="large"/>
                    </div>
                    <div className={classes.text}>
                        Аккаунт успешно активирован.
                    </div>
                </div>
                : 
                <div className={classes.group}>
                <div className={classes.iconfail}>
                 <BlockIcon fontSize="large"/>
                </div>
                <div className={classes.text}>
                    Аккаунт не активирован, неверный хэш.
                </div>
            </div>
                }

            </div>
        </div>
    )
}

export default VerifyPage
