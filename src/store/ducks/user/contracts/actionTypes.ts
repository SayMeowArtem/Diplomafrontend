import { Action } from 'redux';
import { RegisterFormProps } from '../../../../components/RegisterModal';
//@ts-ignore
import { LoginFormProps } from '../../../../components/SignInForm';
import { LoadingStatus } from '../../../types';


import {User} from './state';

export enum UserActionsType {
    SET_USER_DATA = 'user/SET_USER_DATA',
    FETCH_SIGN_IN = 'user/FETCH_SIGN_IN',
    FETCH_SIGN_UP = 'user/FETCH_SIGN_UP',
    SET_LOADING_STATE = 'user/SET_LOADING_STATE',
    SET_ALL_USERS_DATA = 'users/SET_ALL_USERS_DATA',
    FETCH_SET_USERS_DATA = 'users/FETCH_SET_USERS_DATA',
    ClearStore = 'CLEAR_STORE',
    FETCH_CLEAR_STORE = 'FETCH_CLEAR_STORE',
    UPDATE_USER = 'user/UPDATE_USER',
    SEARCH_USER = 'user/SEARCH_USER'
}

export interface searchUsersActionInterface extends Action<UserActionsType> {
    type: UserActionsType.SEARCH_USER,
    payload: any
}

export interface fetchUpdateUserActionInterface extends Action<UserActionsType> {
    type: UserActionsType.UPDATE_USER,
    payload: any
}

export interface SetAllUsersDataActionInterface extends Action<UserActionsType> {
    type: UserActionsType.SET_ALL_USERS_DATA,
    payload: any
}

export interface ClearStoreActionInterface extends Action<UserActionsType> {
    type: UserActionsType.ClearStore,
    payload: any
}

export interface FetchClearStoreActionInterface extends Action<UserActionsType> {
    type: UserActionsType.FETCH_CLEAR_STORE,
    payload: any
}

export interface fetchSetAllUsersDataActionInterface extends Action<UserActionsType> {
    type: UserActionsType.FETCH_SET_USERS_DATA,
    payload: any
}

export interface FetchSignInActionInterface extends Action<UserActionsType> {
    type: UserActionsType.FETCH_SIGN_IN,
    payload: LoginFormProps;
} 

export interface FetchSignUpActionInterface extends Action<UserActionsType> {
    type: UserActionsType.FETCH_SIGN_UP,
    payload: RegisterFormProps
}

export interface SetUserDataActionInterface extends Action<UserActionsType> {
    type: UserActionsType.SET_USER_DATA,
    payload: User | undefined;
}




export interface SetUserLoadingStatusActionInterface extends Action<UserActionsType> {
    type: UserActionsType.SET_LOADING_STATE,
    payload: LoadingStatus
}