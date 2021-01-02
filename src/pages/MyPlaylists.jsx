import { useDispatch, useSelector } from 'react-redux';
import React from 'react'
import Playlist from '../components/Playlist/Playlist';
import { fetchMyPlaylistsData, SearchPlaylist } from '../store/ducks/playlists/actionCreators';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import styles from './MyPlaylists.module.scss'
import { SelectMyPlaylists, SelectMyPlaylistsStatus, SelectAddFormState, SelectDeleteFormState, SelectUpdateFormState, SelectSearch  } from '../store/ducks/playlists/selectors';
import { Typography, IconButton, TextField } from '@material-ui/core';
import ModalAddPlaylist from '../components/ModalAddPlaylist';
import { FormState } from '../store/ducks/playlists/contracts/state';
import { selectUserData } from '../store/ducks/user/selectors';
import { createStyles, makeStyles,Theme } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
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

const MyPlaylists = () => {
    const classes = useStyles(); 
    const [modalAdd, setmodalAdd] = React.useState(false);
    const [searchMode, setseatchMode] = React.useState(false);
    const handleOpen = () => {
        setmodalAdd(true);
      };
    
      const handleClose = () => {
        setmodalAdd(false);
      };

    const dispatch = useDispatch();
    const Status = useSelector(SelectMyPlaylistsStatus);
    let items = useSelector(SelectMyPlaylists);
    let searchItems = useSelector(SelectSearch);
    const AddStatus = useSelector(SelectAddFormState);
    const DeleteStatus = useSelector(SelectDeleteFormState);
    const UserData = useSelector(selectUserData);
    let myID;
    if (UserData) {
        myID = UserData._id;
    }
      console.log(items);
    //костыль надо исправить
    const UpdateStatus = useSelector(SelectUpdateFormState);
    const [hideSearch, sethideSearch] = React.useState(true);
    const [updateStatusLocal, setupdateStatusLocal] = React.useState(false);


    
    const handleSearch= (e) => {
       dispatch(SearchPlaylist(e.target.value));
       setseatchMode(true);
    }

    React.useEffect(() => {
            dispatch(fetchMyPlaylistsData());
            setupdateStatusLocal(false);
    }, [AddStatus, DeleteStatus, updateStatusLocal]);

    const handleUpdateStatus = (state) => {
        setupdateStatusLocal(state);
    }

    return (
        <div className={styles.MyPlaylists}>
            <div className={styles.container}>
                <div className={styles.MyPlaylists_header}>
                    <Typography className={classes.Header_title}> 
                         Мои курсы
                    </Typography>
                    <ModalAddPlaylist type="AddPlaylist" open={modalAdd} handleClose={handleClose}/>
                   <IconButton  onClick={ () => handleOpen()} className={styles.Add_new_course} color="primary">
                       <AddCircleIcon />
                   </IconButton >
                        <IconButton className={styles.Search} color="primary" onClick={ () => sethideSearch(!hideSearch)}>
                     <SearchIcon />
                   </IconButton>
                   <TextField hidden={hideSearch} placeholder="Поиск..." className={classes.textField} onChange={handleSearch}/>
                </div>
                {/* {AddStatus === FormState.LOADING ? <div>Loading</div> : <div className={styles.MyPlayLists_items}>
                 
                {searchItems && searchItems.length > 0 ? searchItems.map( item => <Playlist handleUpdateStatus={handleUpdateStatus} key={item._id + 123132} isMy={myID === item.owner._id} id={item._id} title={item.title} coverURL={item.coverURL}/>).reverse()
            : items && searchMode === false ? items.map( item => <Playlist handleUpdateStatus={handleUpdateStatus} key={item._id + 123132} isMy={myID === item.owner._id} id={item._id} title={item.title} coverURL={item.coverURL}/>).reverse()
            : <div>{searchMode ? "Не найдено плейлистов по ключевому слову.": "В данный момент у вас отсутствуют плейлисты."}</div>} 
             </div>}  */}
              
              {AddStatus === FormState.LOADING ? <div>Loading</div> : <div className={styles.MyPlayLists_items}>

            {searchItems && searchItems.length > 0 ? searchItems.map( item => <Playlist handleUpdateStatus={handleUpdateStatus} key={item._id + 123132} isMy={myID === item.owner._id} id={item._id} title={item.title} coverURL={item.coverURL}/>).reverse()
            : items.length > 0 && searchMode === false  ? items.map( item => <Playlist handleUpdateStatus={handleUpdateStatus} key={item._id + 123132}   id={item._id} title={item.title} coverURL={item.coverURL}/>).reverse()
            : <div>{searchMode ? "По ключевому слову ничего не найдено." : "В данный момент у вас отсутствуют плейлисты."}</div> }
             </div>} 

              
            </div>

        </div>
    )
}

export default MyPlaylists
