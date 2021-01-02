import { call, put, takeLatest } from "redux-saga/effects";
import { playlistsApi } from "../../../api/playlistsApi";
import { LoadingStatus } from "../../types";
import { AddPlaylist, deletePlaylist, fetchDletePlaylist, fetchUpdatePlaylist, setAddFormState, SetMyPlaylists, setPlaylistsLoadingState, UpdatePlaylist, } from "./actionCreators";
import { PlaylistsActionType } from "./contracts/actionTypes";
import { FormState} from "./contracts/state";



export function* fetchSetMyPlaylists( ) {
    try {
        yield put(setPlaylistsLoadingState(LoadingStatus.LOADING));
        const { data} = yield call (playlistsApi.getMyPlaylists);
        yield put(SetMyPlaylists(data));
        yield put(setPlaylistsLoadingState(LoadingStatus.SUCCESS));
    }
    catch (error) {
        yield put(setPlaylistsLoadingState(LoadingStatus.ERROR));
    }
}





export function* fetchAddPlaylistRequest(payload: any) {
    try {
        const item = yield call(playlistsApi.AddPlaylist, payload.payload);
     
        yield put(AddPlaylist(item));
    } catch (error) {
       
        yield put(setAddFormState(FormState.ERROR));
    }
}

export function* fetchDeletePlaylistRequest(payload: any) {
    try {
        if (window.confirm("Вы действительно хотите удалить плейлист?")) {
            yield call(playlistsApi.DeletePlaylist, payload.payload);
            yield put(deletePlaylist(payload.payload));
        }
        else {

        }
       
    } catch (error) {
        yield put(fetchDletePlaylist(FormState.ERROR));
    }
}

export function* fetchUpdatePlaylistRequst(payload: any) {
    try {
        //@ts-ignore
        yield call(playlistsApi.UpdatePlaylist, payload.payload);
        yield put(UpdatePlaylist(payload));
        yield put(fetchUpdatePlaylist(FormState.SUCCESS));
    } catch (error) {
        yield put(fetchUpdatePlaylist(FormState.ERROR))
    }
}



export function* playlistsSaga() {
    yield takeLatest(PlaylistsActionType.FETCH_SET_MY_PLAYLISTS, fetchSetMyPlaylists);
    yield takeLatest(PlaylistsActionType.FETCH_ADD_PLAYLIST, fetchAddPlaylistRequest);
    yield takeLatest(PlaylistsActionType.FETCH_DELETE_PLAYLIST, fetchDeletePlaylistRequest);
    yield takeLatest(PlaylistsActionType.FETCH_UPDATE_PLAYLIST, fetchUpdatePlaylistRequst);
  
}
// export function* userSaga() {
//     yield takeLatest(UserActionsType.FETCH_SIGN_IN, fetchSignInRequest);
//     yield takeLatest(UserActionsType.FETCH_SIGN_UP, fetchSignUpRequest);
// }


// export function* fetchSignInRequest( {payload}: FetchSignInActionInterface) {
//     try {

//         const { data } = yield call( AuthApi.signIn, payload);
//         console.log(data);
//         window.localStorage.setItem('token', data.token);
//         yield put(setUserData(data));
//     }
//     catch (error) {
//         yield put(setUserLoadingState(LoadingStatus.ERROR));
//     }
// }

// export function* fetchSignUpRequest({payload}: FetchSignUpActionInterface) {
//     try {
//         yield put(setUserLoadingState(LoadingStatus.LOADING));
//         yield call(AuthApi.signUp, payload);
//         yield put(setUserLoadingState(LoadingStatus.SUCCESS));
//     }
//     catch (error) {
//         yield put(setUserLoadingState(LoadingStatus.ERROR));
//     }
// }


// export function* userSaga() {
//     yield takeLatest(UserActionsType.FETCH_SIGN_IN, fetchSignInRequest);
//     yield takeLatest(UserActionsType.FETCH_SIGN_UP, fetchSignUpRequest);
// }