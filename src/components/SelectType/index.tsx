import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


import './selectType.scss'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 552
    },
    selectEmpty: {
    },
  }),
);

export default function SelectType() {
  const classes = useStyles();
  const [typeSelect, setTypeSelect] = React.useState('');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTypeSelect(event.target.value as string);
  };

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          Тип аккаунта
        </InputLabel>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={typeSelect}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value={"1"}>Ученик</MenuItem>
          <MenuItem value={"2"}>Преподаватель</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}