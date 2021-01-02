import { applyMiddleware, compose, createStore} from "redux";
import { UserState } from "./ducks/user/contracts/state";
import  rootReducer  from "./rootReducer";
import createSagaMiddleware from 'redux-saga';
import rootSaga from "./saga";
import { PlaylistState } from "./ducks/playlists/contracts/state";
import { VideoState } from "./ducks/videos/contacts/state";
import { CommentsState } from "./ducks/comments/contracts/state";
import { SubscribeState } from "./ducks/subscribes/contracts/state";


declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }

const composeEnhancers =
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


const sagaMiddleware = createSagaMiddleware();



  export interface RootState { 
    user: UserState,
    playlists: PlaylistState,
    videos: VideoState,
    comments: CommentsState,
    subscribes: SubscribeState
  }



export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);