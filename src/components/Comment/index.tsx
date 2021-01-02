import { Typography } from '@material-ui/core'
import React from 'react'
import { formatDate } from '../../utils/formatDate'

import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

import style from './Comment.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { selectUserData } from '../../store/ducks/user/selectors';
import { fetchDeleteComments } from '../../store/ducks/comments/ActionCreators';
import userHeaderAvatar from '../../assets/img/userHeader.png';


interface CommentPropsInterface {
    _id: string;
    text: string;
    createdAt: string;
    login: string;
    userID: string;
    avatar: string;
}


const Comment = ({_id,text, createdAt, login, userID, avatar}: CommentPropsInterface) => {
     const MyID = useSelector(selectUserData)?._id;
    
     console.log(_id);
     const dispatch = useDispatch();

     const handleDelete = () => {
        dispatch(fetchDeleteComments(_id));
     }

    return (
        <div className={style.CommentBlock}>
          <div className={style.Avatar}>
              <img src={avatar ? avatar : userHeaderAvatar} alt=""/>
          </div>
          <div className={style.InfoBlock}>
              <div className={style.InfoBlock_header}>
                  <div className={style.InfoBlock_header_NameUser}>
                    {login}
                  </div>
                  <div className={style.InfoBlock_header_date}>
                    { formatDate(new Date(createdAt)) + " назад" }
                  </div>
                  { userID === MyID &&  <IconButton onClick={handleDelete} style={{ color: '#4447e2', padding: '0px', paddingTop: '0px', paddingLeft: '5px', paddingRight: '5px', marginLeft: '3px', marginTop: '-3px'}}>
                    <DeleteIcon style={{ fontSize: '15px'}}/>
                  </IconButton>}
                 
              </div>
                  <Typography className={style.InfoBlock_text}> 
                        {text}
                  </Typography>
            
          </div>

        </div>
    )
}

export default Comment
