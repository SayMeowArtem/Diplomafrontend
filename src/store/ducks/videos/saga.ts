import { call, put, takeLatest } from "redux-saga/effects";
import { videosApi } from "../../../api/videosApi";
import { LoadingStatus } from "../../types";
import { setLoadingState, setVideos } from "./ActionCreators";

import { VideosActionType } from "./contacts/actionTypes";


export function* fetchSetVideos ({payload}: any) {
    try {
        
        yield put(setLoadingState(LoadingStatus.LOADING));
        const {data} = yield call(videosApi.getVideosbyID, payload);
        yield put(setVideos(data));
        yield put(setLoadingState(LoadingStatus.SUCCESS));
    } catch (error) {
        yield put(setLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchDeleteVideosRequest(payload: any) {
    try {
        if (window.confirm("Вы действительно хотите удалить видео?")) {
            yield call(videosApi.DeleteVideo, payload.payload);
        }
        else {
        }

    } catch (error) {
       console.log(error);
    }
}

export function* fetchUpdateVideosRequest(payload: any) {
    try {
            yield call(videosApi.UpdateVideo, payload.payload)
    } catch (error) {
        console.log(error)
    }
}

export function* fetchAddVideosRequest(payload: any) {
    // try {
        console.log(payload)
        const item = yield call(videosApi.AddVideos,payload);
        console.log(item);
    // } catch (error) {
    //     console.log("хааай");
    // }
}

export function* videosSaga() {
    yield takeLatest(VideosActionType.FETCH_SET_VIDEOS, fetchSetVideos);
    yield takeLatest(VideosActionType.DELETE_VIDEOS, fetchDeleteVideosRequest);
    yield takeLatest(VideosActionType.UPDATE_VIDEOS, fetchUpdateVideosRequest);
    yield takeLatest(VideosActionType.ADD_VIDEOS, fetchAddVideosRequest);
}