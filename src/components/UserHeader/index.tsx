import React from 'react';

import userHeaderAvatar from '../../assets/img/userHeader.png';
import dropbtn from '../../assets/img/drop.png';


import './UserHeader.scss';
import { IconButton, makeStyles, Theme } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import PopoverHeader from '../PopoverHeader';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../store/ducks/user/selectors';



const UserHeader = () => {
 
  const Avatar =  useSelector(selectUserData)?.avatar;

  return (
    <div className="userHeader">
      <div className="userHeader_avatar">
        <img src={Avatar ? Avatar : userHeaderAvatar} alt="" />
      </div>
      <div className="userHeader_drop">
        <PopoverHeader editMode={true}/>
      </div>
    </div>
  );
};

export default UserHeader;
