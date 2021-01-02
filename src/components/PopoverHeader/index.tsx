import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import editmenu from '../../assets/img/more-vertical.svg';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import './Popover.scss';
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Height } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { ClearStore, fetchClearStore } from '../../store/ducks/user/actionCreators';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },
    btn: {
      padding: '0px',
      color: '#ffffff',
      '&:hover': {
        color: '#1890FF'
      }
    },
    menu: {
      marginTop: '20px',
      marginLeft: '90px',
      "& .MuiPaper-root": {
        backgroundColor: '#2D2D3A',

        borderRadius: "5px"
      }
     
   
    },
    menu_container: {
      background: '#1C1C24',
      border: '2px solid #2D2D3A',
      borderRadius: '5px'
    },
    menu_item_container: {
      display: 'Flex',
      padding: '5px'
     
    },
    menu_item: {
      width: '220px',
      color: '#ffffff',
      overflow: 'hidden',
    
    },
    line: {
      background:'#2D2D3A',
      height: '1px',
      width: '100%',
    },
    text: {
      marginLeft: '2px',
      lineHeight: '25px'
    },
    logout: {
      display: 'flex',
      color: '#E24444',
      '&:hover': {
        color: '#E24444'
      }
    }
  }),
);


interface SimplePopoverProps  {

  editMode: boolean;
}

export default function PopoverHeader({ editMode}: SimplePopoverProps): React.ReactElement {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const dispatch = useDispatch();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const ClearStorage = () => {
    window.localStorage.setItem('token', "");
    dispatch(fetchClearStore(null));
  }  
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
        <IconButton  aria-describedby={id} className={classes.btn} onClick={handleClick} >
          <ArrowDropDownIcon  />
        </IconButton>
        <div>
        <Popover  
        id={id}
        open={open}
        className={classes.menu}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
      >
        <div className={classes.menu_container}>
        <div className={classes.menu_item}>
          <Link to={"/home/myprofile/"}>
            <div className={classes.menu_item_container}>
              <PersonIcon /> 
              <div className={classes.text}>
                Мой профиль
              </div>
            </div>
          </Link>
            <div className={classes.line}>
            </div>
            <div className={classes.menu_item_container}>
              <Link className={classes.logout} to={"/"} onClick={() =>  ClearStorage()}>
              <ExitToAppIcon />
              <div className={classes.text}>
                Выйти из уч. записи
              </div>
              </Link>
            
            </div>
        
        </div>
          <div  className={classes.menu_item}>
         



          </div>
        </div>
    
          
          
      </Popover>
        </div>
     
     
    </div>
  );
}