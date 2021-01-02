import { Button, Snackbar } from '@material-ui/core'
import { format } from 'date-fns'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FetchAddSubscribe, FetchDeleteSubscribe, FetchSetSubscribes } from '../../store/ducks/subscribes/actionCreators'
import { SelectSubscribes } from '../../store/ducks/subscribes/selectors'
import { selectUserData } from '../../store/ducks/user/selectors'

import styles from './UsersItem.module.scss'
import avatarUser from '../../assets/img/avatar.png';
import { Link } from 'react-router-dom'
import { Alert } from '@material-ui/lab';
import { playlistsApi } from '../../api/playlistsApi'

interface UserItemPropsInterface  {
    _id: string,
    username: string,
    fullname: string,
    email: string,
    createdAt: string,
    avatar: string,
    checkSubscribe: (_id: any) => boolean,
}


const UsersItem = ({_id, avatar, checkSubscribe, username, fullname, email, createdAt} : UserItemPropsInterface) => {
  const myID  = useSelector(selectUserData)?._id;

  let check = checkSubscribe(_id);
  const dispatch = useDispatch();
 
  let subscribeItem = {
    author: _id,
    subscriber: myID
  }

  const [state, setState] = React.useState({
     SubscribeCount: undefined,
     PlaylistsCount: undefined
  })

  React.useEffect(() => {
    playlistsApi.GetInfoForUsersPage(_id).then( res => {
      setState({
        SubscribeCount: res.data.subscribesCount,
        PlaylistsCount: res.data.coursesCount
      })
    })
  }, [])

  const handleAddSubscribe = () => {
    dispatch(FetchAddSubscribe(subscribeItem))
    dispatch(FetchSetSubscribes(null));
    setshow(true);
    setTimeout( () => setshow(false), 2000);
   
}

const handleDeleteSubscribe = () => {
  console.log(subscribeItem);
    dispatch(FetchDeleteSubscribe(subscribeItem));
    check = true;
}

const [show, setshow] = React.useState(false);





return (
  <>
    <div className={styles.UserPage_item}>
      <div className={styles.UserPage_item_char}>
        <div className={styles.UserPage_item_Avatar}>
          <img src={avatar ? avatar : avatarUser} alt=""/>
        </div>
      </div>
      <div className={styles.UserPage_item_char}>
        <div className="UserPage_item_Avatar_NickName">
           {"Никнейм: " + username}
         </div>
      </div>
      <div className={styles.UserPage_item_char}>
      <div className="UserPage_item_Avatar_fullname">
        {"Полное имя: " + fullname}
    </div>
      </div>
      <div className={styles.UserPage_item_char}>
      <div className="UserPage_item_Avatar_registred">
          {createdAt ? "Зарегистрирован: " + format(new Date(createdAt), 'dd.MM.yyyy') : format(new Date(), 'dd.MM.yyyy')}
    </div>
      </div>
      <div className={styles.UserPage_item_char}>
      <div className="UserPage_item_count_courses">
        Количество курсов: {state.PlaylistsCount}
    </div>
      </div>
      <div className={styles.UserPage_item_char}>
      <div className="UserPage_item_count_subscribers">
        Подписчиков: {state.SubscribeCount}
    </div>
      </div>
      <div className={styles.UserPage_item_char}>
        <Link to={"/home/profile/" + _id}>
          <Button fullWidth variant="contained" color="primary">Перейти</Button>
        </Link>
        
      </div>
      <div className={styles.UserPage_item_char}>
        { !check ? <Button fullWidth variant="contained" color="secondary" onClick={() => handleAddSubscribe() }>Подписаться</Button> : <Button fullWidth variant="contained" color="default" onClick={() => handleDeleteSubscribe() }>Отписаться</Button> }
      </div>

</div>
<Snackbar open={show} anchorOrigin={{  vertical: 'top',
          horizontal: 'center' }}>
      <Alert severity="success" >Вы успешно подписались на автора: {username}</Alert>
    </Snackbar>
</>
)
}

export default UsersItem
