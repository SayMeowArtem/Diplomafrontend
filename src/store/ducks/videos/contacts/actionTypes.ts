import { Action } from "redux";
import { LoadingStatus } from "../../../types";
import { Video, VideoState } from "./state";

export enum VideosActionType {
    SET_VIDEOS = 'videos/SET_VIDEOS',
    SET_LOADING_STATE = 'videos/SET_LOADIN_STATE',
    FETCH_SET_VIDEOS = 'videos/FETCH_SET_VIDEOS',
    DELETE_VIDEOS = 'videos/DELETE_VIDEOS',
    UPDATE_VIDEOS = 'videos/UPDATE_VIDEOS',
    ADD_VIDEOS = 'videos/ADD_VIDEOS'
 }

export interface SetVideosActionInterface extends Action<VideosActionType> {
    type: VideosActionType.SET_VIDEOS,
    payload: VideoState
}

export interface fetchAddVideosActionInterface extends Action<VideosActionType> {
    type: VideosActionType.ADD_VIDEOS,
    payload: any
}

export interface fetchDeleteVideosActionInterface extends Action<VideosActionType> {
    type: VideosActionType.DELETE_VIDEOS,
    payload: string
}

export interface fetchUpdateVideosActionInterface extends Action<VideosActionType> {
    type: VideosActionType.UPDATE_VIDEOS,
    payload: any
}



export interface setLoadinStateActionInterface extends Action<VideosActionType> {
    type: VideosActionType.SET_LOADING_STATE,
    payload: LoadingStatus
}

export interface fetchSetVideosActionInterface extends Action<VideosActionType> {
    type: VideosActionType.FETCH_SET_VIDEOS,
    payload: any
}