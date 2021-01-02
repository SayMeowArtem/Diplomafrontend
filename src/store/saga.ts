import { userSaga } from "./ducks/user/sagas";
import { all } from 'redux-saga/effects';
import { playlistsSaga } from "./ducks/playlists/sagas";
import { videosSaga } from "./ducks/videos/saga";
import { commentsSaga } from "./ducks/comments/saga";
import { subscribeSaga } from "./ducks/subscribes/sagas";


export default function* rootSaga() {
    yield all([ userSaga(), playlistsSaga(), videosSaga(), commentsSaga(), subscribeSaga()]);
}