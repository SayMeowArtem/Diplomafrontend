import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Switch, Route, Redirect } from 'react-router-dom';
import { AuthApi } from './api/authApi';

import './App.scss';
import { Auth } from './pages/Auth';
import { Home } from './pages/Home';
import VerifyPage from './pages/VerifyPage';
import { setUserData } from './store/ducks/user/actionCreators';
import { selectIsAuth, selectUserStatus } from './store/ducks/user/selectors';
import { LoadingStatus } from './store/types';

const App = () => {
  
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const loadingStatus = useSelector(selectUserStatus);
  const isReady = loadingStatus !== LoadingStatus.NEVER && loadingStatus !== LoadingStatus.LOADING;

  const checkAuth = async () => {
    try {
      const {data} = await AuthApi.getMe();
      dispatch(setUserData(data));
    }
    catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    checkAuth();
  }, [])
  
  React.useEffect(() => {
    // if (!isAuth) {
    //   history.push('/');
    // }
    // else {
    //   history.push('/home/myplaylists');
    // }
  }, [isAuth, isReady])

  return (
    <div className="App"> 
      <Switch>
        <Route path="/" component={Auth} exact/>
        <Route path="/home" component={Home}  />
        <Route path="/auth/verify"  component={VerifyPage} exact>
       
        </Route>
      </Switch>
    </div>
 
  );
}

export default App;
