import React from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import './SignIn.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Color } from '@material-ui/lab';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import { Button, TextField, Typography  } from '@material-ui/core';
import { fetchSignIn } from '../../store/ducks/user/actionCreators';
import { RegisterModal } from '../RegisterModal';
import { selectUserStatus } from '../../store/ducks/user/selectors';
import { LoadingStatus } from '../../store/types';
import { useHistory } from 'react-router-dom';
import { createStyles, makeStyles,Theme } from '@material-ui/core';


export interface LoginFormProps {
  email:string;
  password: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },
    textField: {
      background: '#2D2D3A',
      width: '430px',
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



const SignInFormSchema = yup.object().shape({
  email: yup.string().email('Неверная почта').required('Введите почту'),
  password: yup.string().min(6,'Минимальная длинна пароля 6 символов').required(),
});

const SignInForm: React.FC<any> = ({}): React.ReactElement => {
   const [visibleModal, setVisibleModal] = React.useState<boolean>(false);
   const loadingStatus = useSelector(selectUserStatus);
   const openNotificationRef = React.useRef<(text: string, type: Color) => void>(() => { });
    const classes = useStyles();
   const handleCloseModal = (): void => {
     setVisibleModal(false);
   }
  const dispatch = useDispatch();
  // const dispatch = useDispatch();
  const history = useHistory();
   
  const { control, handleSubmit, errors } = useForm<LoginFormProps>({
    resolver: yupResolver(SignInFormSchema)
  });
   const isError = loadingStatus === LoadingStatus.ERROR;
  //Проверка на авторизацию для показа нотификации 

  const onSubmit = async (data: LoginFormProps) => {
    dispatch(fetchSignIn(data));

    
  };
  return (
    <>
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
              <FormControl  component="fieldset" fullWidth>
                <FormGroup aria-label="position" row>
                  <Controller
                    as={TextField}
                    className={classes.textField}
                    control={control}
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
                    className={classes.textField}
                    control={control}
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
                  <Typography className={classNames("Error",{"Error_active": isError})}>Неверный логин или пароль</Typography>
                  <div className="Buttons">
                  <Button className="Button_login " type="submit" variant="contained" color="primary" fullWidth>
                    Войти
                  </Button>
                  <Button  onClick={ () => setVisibleModal(true) }  className="Button_login" variant="contained" color="primary" fullWidth>
                    Регистрация
                  </Button>
                  </div>

                </FormGroup>
              </FormControl>
            </form>
    <RegisterModal open={visibleModal === true} onClose={handleCloseModal} />
    </>
  );
};

export default SignInForm;