import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { ModalBlock } from '../ModalBlock';
import {Notification} from '../Notification'; 
import { Color } from '@material-ui/lab';
import SelectType from '../SelectType';

import './RegisterModal.scss'
import { fetchSignUp } from '../../store/ducks/user/actionCreators';
import { selectUserStatus } from '../../store/ducks/user/selectors';
import { LoadingStatus } from '../../store/types';
import { createStyles, makeStyles,Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },
    textField: {
      background: '#2D2D3A',
      width: '100%',
      marginBottom: '10px',
      '& .MuiInputBase-input': {
          background: '#ffffff',
          color: '#000000',
          marginBottom: '0px',
      
          paddingLeft: '12px'
      },
      '& .MuiInput-underline:after': {
          bottom: '-10px',
          borderBottom: '1px solid #ffffff'
      },
   
      '& .MuiInput-underline:before': {
          border: 'none'
      }
  },
    
  }),
);

interface RegisterModalProps {
    open: boolean;
    onClose: () => void;
}

export interface RegisterFormProps {
    fullname: string;
    username: string;
    email: string;
    password: string;
    password2: string;
    // select: string;
}


const RegisterFormSchema = yup.object().shape({
    fullname: yup.string().required('Введите своё имя'),
    email: yup.string().email('Неверная почта').required('Введите почту'),
    // select: yup.string().required('Не выбран тип'),
    username: yup.string().required('Введите логин'),
    password: yup.string().min(6, '​Минимальная длина пароля 6 символов').required(),
    password2: yup.string().oneOf([yup.ref('password')], 'Пароли не соответствуют'),
  
})

export const RegisterModal: React.FC<RegisterModalProps> = ({open, onClose}): any => {
    const dispatch = useDispatch();
    const openNotificationRef = React.useRef<(text: string, type: Color) => void>(() => {});
    const loadingStatus = useSelector(selectUserStatus);

    const classes = useStyles();
    const {control, handleSubmit, errors} = useForm<RegisterFormProps>({
        resolver: yupResolver(RegisterFormSchema)
    })
    
    React.useEffect( () => {
      if (loadingStatus === LoadingStatus.SUCCESS ||loadingStatus === LoadingStatus.LOADING) {
        openNotificationRef.current('Регистрация завершена, подтвердите почту', 'success');
        onClose();
      }
      else if (loadingStatus === LoadingStatus.ERROR) {
        openNotificationRef.current('Ошибка при регистрации, Логин или почта уже используется', 'error');
    
      }
    }, [loadingStatus]);




    const onSubmit = async( data: RegisterFormProps) => {
         dispatch(fetchSignUp(data));
         
    }

   
    return  <Notification>
    {
      callback => {
        openNotificationRef.current = callback;
        return (
          <ModalBlock
            visible={open}
            onClose={onClose}
            title="Регистрация">
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl component="fieldset" fullWidth>
                <FormGroup aria-label="position" row>
                  <Controller
                    as={TextField}
                    control={control}
                    className={classes.textField}
                    name="email"
                    id="email"
                    label="E-Mail"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                    type="email"
                    defaultValue=""
                    helperText={errors.email?.message}
                    error={!!errors.email}
                    fullWidth
                    autoFocus
                  />
                  <Controller
                    as={TextField}
                    control={control}
                    className={classes.textField}
                    name="username"
                    id="username"
                    label="Логин"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                    type="text"
                    defaultValue=""
                    helperText={errors.username?.message}
                    error={!!errors.username}
                    fullWidth
                  />
                  {/* <Controller
                    as={<Select>
                        <option value="teach">
                            Преподаватель
                        </option>
                        <option value="learn">
                            Ученик
                        </option>
                    </Select>}
                    control={control}
                    name="select"
                    //@ts-ignore
                    id="select"
                    label="Тип аккаунта"
                    variant="filled"
                    type="text"
                    defaultValue="default"
                    fullWidth
                  /> */}
                  <Controller
                    as={TextField}
                    control={control}
                    className={classes.textField}
                    name="fullname"
                    id="fullname"
                    label="Ваше имя"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                    type="text"
                    defaultValue=""
                    helperText={errors.fullname?.message}
                    error={!!errors.fullname}
                    fullWidth
                  />
                  <Controller
                    as={TextField}
                    control={control}
                    className={classes.textField}
                    name="password"
                    id="password"
                    label="Пароль"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                    type="password"
                    defaultValue=""
                    helperText={errors.password?.message}
                    error={!!errors.password}
                    fullWidth
                  />
                  <Controller
                    as={TextField}
                    control={control}
                    className={classes.textField}
                    name="password2"
                    id="password2"
                    label="Введите пароль еще раз"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                    type="password"
                    defaultValue=""
                    helperText={errors.password2?.message}
                    error={!!errors.password2}
                    fullWidth
                  />
                  <Button type="submit" variant="contained" color="primary"  id="btn_register" fullWidth>
                    Регистрация
                  </Button>
                </FormGroup>
              </FormControl>
            </form>
          </ModalBlock>
        )
      }
    }
  </Notification>


}