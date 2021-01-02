import { call, put, takeLatest } from "redux-saga/effects";
import { CommentsApi } from "../../../api/commentApi";
import { LoadingStatus } from "../../types";
import { AddComments, setComments, setLoadingState } from "./ActionCreators";
import { CommentsActionType } from "./contracts/actionTypes";

export function* fetchSetComments ({payload}: any) {
    try {
        
        yield put(setLoadingState(LoadingStatus.LOADING));
        const {data} = yield call(CommentsApi.getComments, payload);
        yield put(setComments(data));
        yield put(setLoadingState(LoadingStatus.SUCCESS));
    } catch (error) {
        yield put(setLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchAddComments ( {payload}: any) {
    try {
        const {data} = yield call(CommentsApi.addComment, payload);
        console.log(data);
        yield put(AddComments(data));
    } catch (error) {
        
    }
}

export function* fetchDeleteComments ( {payload}: any) {
    try {
     
        if (window.confirm("Вы действительно хотите удалить комментарий?")) {
            yield call(CommentsApi.DeleteComment, payload);
        }
        else {
        }
    } catch (error) {
       console.log(error);
    }
}

export function* commentsSaga() {
    yield takeLatest(CommentsActionType.FETCH_SET_COMMENTS, fetchSetComments);
    yield takeLatest(CommentsActionType.FETCH_ADD_COMMENT,  fetchAddComments);
    yield takeLatest(CommentsActionType.DELETE_COMMENTS, fetchDeleteComments);
}