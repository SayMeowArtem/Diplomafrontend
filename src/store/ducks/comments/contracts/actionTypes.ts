import { Action } from "redux";
import { LoadingStatus } from "../../../types";
import { Comments, CommentsState } from "./state";

export enum CommentsActionType {
    SET_COMMENTS = 'comments/SET_COMMENTS',
    ADD_COMMENTS = 'comments/ADD_COMMENTS',
    SET_LOADING_STATE = 'comments/SET_LOADING_STATE',
    FETCH_SET_COMMENTS = 'comments/FETCH_SET_COMMENTS',
    FETCH_ADD_COMMENT = 'comments/FETCH_ADD_COMMENTS',
    DELETE_COMMENTS = 'comments/DELETE_COMMENTS'
 }

 export interface SetCommentsActionInterface extends Action<CommentsActionType> {
    type: CommentsActionType.SET_COMMENTS,
    payload: CommentsState
}

export interface AddCommentsActionInterface extends Action<CommentsActionType> {
    type: CommentsActionType.ADD_COMMENTS,
    payload: Comments
}

export interface DeleteCommentsActionInterface extends Action<CommentsActionType> {
    type: CommentsActionType.DELETE_COMMENTS,
    payload: string
}

export interface FetchAddCommentsActionInterface extends Action<CommentsActionType> {
    type: CommentsActionType.FETCH_ADD_COMMENT,
    payload: Comments
}

export interface setLoadinStateActionInterface extends Action<CommentsActionType> {
    type: CommentsActionType.SET_LOADING_STATE,
    payload: LoadingStatus
}

export interface fetchSetCommentsActionInterface extends Action<CommentsActionType> {
    type: CommentsActionType.FETCH_SET_COMMENTS,
    payload: any
}