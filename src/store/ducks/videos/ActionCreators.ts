
import { LoadingStatus } from "../../types";

import { fetchAddVideosActionInterface, fetchDeleteVideosActionInterface, fetchSetVideosActionInterface, fetchUpdateVideosActionInterface, setLoadinStateActionInterface, SetVideosActionInterface, VideosActionType } from "./contacts/actionTypes";
import { VideoState } from "./contacts/state";


export const setVideos = (payload: VideoState): SetVideosActionInterface => ({
    type: VideosActionType.SET_VIDEOS,
    payload
})

export const setLoadingState = (payload: LoadingStatus): setLoadinStateActionInterface => ({
    type: VideosActionType.SET_LOADING_STATE,
    payload
})

export const fetchAddVideos = (payload: any): fetchAddVideosActionInterface => ({
    type: VideosActionType.ADD_VIDEOS,
    payload
})

export const fetchUpdateVideos = (payload: any): fetchUpdateVideosActionInterface => ({
    type: VideosActionType.UPDATE_VIDEOS,
    payload
})

export const fetchSetVideos = (payload: any): fetchSetVideosActionInterface => ({
    type: VideosActionType.FETCH_SET_VIDEOS,
    payload
})

export const fetchDeleteVideos = (payload: string) : fetchDeleteVideosActionInterface => ({
    type: VideosActionType.DELETE_VIDEOS,
    payload
})


export type VideosActions =
| SetVideosActionInterface
| setLoadinStateActionInterface
| fetchSetVideosActionInterface
| fetchDeleteVideosActionInterface
| fetchUpdateVideosActionInterface
| fetchAddVideosActionInterface