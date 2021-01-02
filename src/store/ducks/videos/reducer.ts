import produce, { Draft } from "immer";
import { LoadingStatus } from "../../types";
import { VideosActions } from "./ActionCreators";



import { VideosActionType } from "./contacts/actionTypes";
import { VideoState } from "./contacts/state";


const initialState: VideoState = {
    items: [],
    LoadingStatus: LoadingStatus.NEVER,
}



export const VideosReducer = produce((draft: Draft<any>, action: VideosActions) => {
    switch(action.type) {
        case VideosActionType.SET_VIDEOS:
            draft.items = action.payload;
        break;
        case VideosActionType.SET_LOADING_STATE:
            draft.LoadingStatus = action.payload;
        break;
        case VideosActionType.DELETE_VIDEOS:
            draft.items = draft.items.filter( ({_id} : any) => _id !== action.payload );
        break;
        case VideosActionType.UPDATE_VIDEOS:
            draft.items = draft.items.map( (el: any) => {
                if (el._id === action.payload.id) {
                    el.title = action.payload.title
                }
                return el;
            }  )
        break;
        case VideosActionType.ADD_VIDEOS:
            draft.items.push(action.payload);

        break;
    }
}, initialState);