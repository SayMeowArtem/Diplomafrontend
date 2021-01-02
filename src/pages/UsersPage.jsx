import { TextField } from '@material-ui/core';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import UsersItem from '../components/UsersItem';
import {  FetchAddSubscribe, FetchDeleteSubscribe, FetchSetSubscribes } from '../store/ducks/subscribes/actionCreators';
import { SelectSubscribes } from '../store/ducks/subscribes/selectors';
import { fetchSetAllUsers, SearchUsers } from '../store/ducks/user/actionCreators';
import { selectAllUsersData, selectUserData ,selectUserSearch } from '../store/ducks/user/selectors';
import { createStyles, makeStyles,Theme } from '@material-ui/core';
import styles from './UsersPage.module.scss'
import {  IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },
    Header : {
        marginTop: '50px',
        position: 'relative'
    },
    Search: {
        color: '#4447e2',
        position: 'absolute',
        bottom: '-15px',
        left: '150px'
    },
    Header_title: {
       fontWeight: '500',
       fontSize: '26px',
       fontFamily: 'Roboto Condensed',
       lineHeight: '20px'
    },
    btn: {
      marginLeft: '50px'
    },
    textField: {
      position: 'absolute',
      left: '200px',
      top: '-5px',
      // marginLeft: '80px',
      // marginTop: '-5px',
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
  }),
);




const UsersPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [searchMode, setseatchMode] = React.useState(false);
    React.useEffect( () => {
        dispatch(fetchSetAllUsers());
        dispatch(FetchSetSubscribes());
    }, [])

    const userData  = useSelector(selectUserData);
    let myID;
    if (userData){
        myID = userData._id
    }
    const items = useSelector(selectAllUsersData);
    let searchItems = useSelector(selectUserSearch);
    const subscribes = useSelector(SelectSubscribes);
    console.log(subscribes);
    
    const checkSubscribe = (_id) => {
        const check = subscribes.find(el => el.author === _id) ? true : false;
        return check
    }
    let verifyUsers;
    let  verifySearchItems;

  

    if (items) {
         verifyUsers = items.filter( item => item.confirmed && item._id !== myID);
    }

   if (searchItems) {
       verifySearchItems = searchItems.filter( item => item.confirmed && item._id !== myID);
   }

    const handleSearch= (e) => {
        dispatch(SearchUsers(e.target.value));
        setseatchMode(true);
     }

     const [hideSearch, sethideSearch] = React.useState(true);
   

    return (
        <div className={styles.UsersPage}>
            <div className={styles.container}>
                <div className={classes.Header}>
                    <div className={classes.Header_title}>
                        Пользователи
                    </div>
                    <IconButton   className={classes.Search} color="primary" onClick={ () => sethideSearch(!hideSearch)}>
                     <SearchIcon />
                   </IconButton>
                    <TextField hidden={hideSearch} placeholder="Поиск..."   className={classes.textField}  onChange={handleSearch}/>
                </div>
              
                <div className={styles.items}>

                {verifySearchItems && verifySearchItems.length > 0 ? verifySearchItems.map( el => <UsersItem  key={el._id} checkSubscribe={checkSubscribe} avatar={el.avatar} _id={el._id} fullname={el.fullname} username={el.username} createdAt={el.createdAt}/>)
            : verifyUsers && verifyUsers.length > 0 && searchMode === false ? verifyUsers.map( el => <UsersItem  key={el._id} checkSubscribe={checkSubscribe} avatar={el.avatar} _id={el._id} fullname={el.fullname} username={el.username} createdAt={el.createdAt}/>)
            : <div>{searchMode ? "Не найдено пользователей по ключевому слову.": " "}</div>} 

                   {/* {  verifyUsers && searchItems.length > 0 ? verifyUsers.map( el => <UsersItem  key={el._id} checkSubscribe={checkSubscribe} avatar={el.avatar} _id={el._id} fullname={el.fullname} username={el.username} createdAt={el.createdAt}/>)
                   : } */}
                </div>
            </div>
        </div>
    )
}

export default UsersPage
