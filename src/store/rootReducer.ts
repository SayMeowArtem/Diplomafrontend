import { combineReducers } from "redux";
import { CommentsReducer } from "./ducks/comments/reducer";
import { playlistsReducer } from "./ducks/playlists/reducer";
import { subscribeReducer } from "./ducks/subscribes/reducer";
import { userReducer } from "./ducks/user/reducer";
import {VideosReducer} from "./ducks/videos/reducer";


const rootReducer = combineReducers({
    user: userReducer,
    playlists: playlistsReducer,
    videos: VideosReducer,
    comments: CommentsReducer,
    subscribes: subscribeReducer
})
//@ts-ignore
export default (state, action) => rootReducer(action.type === 'CLEAR_STORE' ? undefined : state, action);