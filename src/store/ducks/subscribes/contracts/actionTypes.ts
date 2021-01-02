import { Action } from "redux";
import { SubscribeActions } from "../actionCreators";

export enum SubscribeActionType {
    ADD_SUBSCRIBE = 'subscribe/ADD_SUBSCRIBE',
    FETCH_ADD_SUBSCRIBE = 'subscribe/FETCH_ADD_SUBSCRIBE',
    SET_SUBSCRIBES = 'subscribe/SET_SUBSCRIBES',
    FETCH_SET_SUBSCRIBES = 'subscribe/FETCH_SET_SUBSCRIBES',
    DELETE_SUBSCRIBE = 'subscribe/DELELE_SUBSCRIBE',
    FETCH_DELETE_SUBSCRIBES = 'subscribe/FETCH_DELETE_SUBSCRIBES'
}

export interface AddSubscribeActionInterface extends Action<SubscribeActionType> {
    type: SubscribeActionType.ADD_SUBSCRIBE;
    payload: any
}

export interface SetSubscribesActionInterface extends Action<SubscribeActionType> {
    type: SubscribeActionType.SET_SUBSCRIBES;
    payload: any
}

export interface DeleteSubscribesActionInterface extends Action<SubscribeActionType> {
    type: SubscribeActionType.DELETE_SUBSCRIBE,
    payload: any
}

export interface FetchDeleteSubscribesActionInterface extends Action<SubscribeActionType> {
    type: SubscribeActionType.FETCH_DELETE_SUBSCRIBES,
    payload: any
}

export interface FetchAddSubscribeActionInterface extends Action<SubscribeActionType> {
    type: SubscribeActionType.FETCH_ADD_SUBSCRIBE;
    payload: any
}

export interface FetchSetSubscribesActionInterface extends Action<SubscribeActionType> {
    type: SubscribeActionType.FETCH_SET_SUBSCRIBES;
    payload: any
}



