import { LoadingStatus } from "../../types";
import { fetchDeleteVideosActionInterface } from "../videos/contacts/actionTypes";
import { AddCommentsActionInterface, CommentsActionType, DeleteCommentsActionInterface, FetchAddCommentsActionInterface, fetchSetCommentsActionInterface, SetCommentsActionInterface, setLoadinStateActionInterface } from "./contracts/actionTypes";
import { Comments, CommentsState } from "./contracts/state";


export const setComments= (payload: CommentsState): SetCommentsActionInterface  => ({
    type: CommentsActionType.SET_COMMENTS,
    payload
})

export const setLoadingState = (payload: LoadingStatus): setLoadinStateActionInterface  => ({
    type: CommentsActionType.SET_LOADING_STATE,
    payload
})

export const AddComments = (payload: Comments): AddCommentsActionInterface => ({
    type: CommentsActionType.ADD_COMMENTS,
    payload
})

export const FetchAddComments = (payload: Comments): FetchAddCommentsActionInterface => ({
    type: CommentsActionType.FETCH_ADD_COMMENT,
    payload
})

export const fetchSetComments = (payload: any): fetchSetCommentsActionInterface => ({
    type: CommentsActionType.FETCH_SET_COMMENTS,
    payload
})

export const fetchDeleteComments = (payload: any): DeleteCommentsActionInterface => ({
    type: CommentsActionType.DELETE_COMMENTS,
    payload
})

export type CommentsActions =
| SetCommentsActionInterface
| setLoadinStateActionInterface
| fetchSetCommentsActionInterface
| AddCommentsActionInterface
| DeleteCommentsActionInterface