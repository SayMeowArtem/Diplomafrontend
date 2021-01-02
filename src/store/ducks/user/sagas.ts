import { fetchSetAllUsersDataActionInterface, FetchSignInActionInterface, FetchSignUpActionInterface, UserActionsType } from "./contracts/actionTypes";
import { call, put , takeLatest } from 'redux-saga/effects';
import { AuthApi } from "../../../api/authApi";
import { ClearStore, setAllUsers, setUserData, setUserLoadingState } from "./actionCreators";
import { LoadingStatus } from "../../types";
import { selectUserStatus } from "./selectors";

export function* fetchSignInRequest( {payload}: FetchSignInActionInterface) {
    try {

        const { data } = yield call( AuthApi.signIn, payload);
        console.log(data);
        window.localStorage.setItem('token', data.token);
        yield put(setUserData(data));
    }
    catch (error) {
        yield put(setUserLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchSignUpRequest({payload}: FetchSignUpActionInterface) {
    try {
        yield put(setUserLoadingState(LoadingStatus.LOADING));
        yield call(AuthApi.signUp, payload);
        yield put(setUserLoadingState(LoadingStatus.SUCCESS));
    }
    catch (error) {
        yield put(setUserLoadingState(LoadingStatus.ERROR));
    }
}


export function* fetchSetAllUsers() {
    try {

       const { data } =  yield call (AuthApi.getUsers);

       yield put(setAllUsers(data));

    } catch (error) {
        
    }
}

export function* fetchClearStore() {
    try {
        yield put(ClearStore(null));
    } catch (error) {
        
    }
}

export function* fetchUpdateUserRequest(payload: any) {
    try {
            yield call(AuthApi.UpdateUser, payload.payload)
    } catch (error) {
        console.log(error)
    }
}


export function* userSaga() {
    yield takeLatest(UserActionsType.FETCH_SIGN_IN, fetchSignInRequest);
    yield takeLatest(UserActionsType.FETCH_SIGN_UP, fetchSignUpRequest);
    yield takeLatest(UserActionsType.FETCH_SET_USERS_DATA, fetchSetAllUsers);
    yield takeLatest(UserActionsType.FETCH_CLEAR_STORE, fetchClearStore);
    yield takeLatest(UserActionsType.UPDATE_USER, fetchUpdateUserRequest);
}