import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import editmenu from '../../assets/img/more-vertical.svg';

import './Popover.scss';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },
  }),
);

interface SimplePopoverProps  {
  onDelete: () => void;
  onEdit: () => void;
  stopEdit: () => void;
  editMode: boolean;
}

export default function SimplePopover({ editMode, onDelete, onEdit, stopEdit}: SimplePopoverProps): React.ReactElement {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
        
      <Button className="editmenu" aria-describedby={id}  onClick={handleClick}>
        <img src={editmenu} alt=""/>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
      >
          <div>
            {editMode ? <Button size='small' onClick={ () => stopEdit()}>Отменить</Button> : <Button size='small' onClick={ () => onEdit()}>Изменить</Button> }
            
        </div>
          <div>
          <Button size='small' onClick={() => onDelete()}>Удалить</Button>
          </div>
          
          
      </Popover>
    </div>
  );
}