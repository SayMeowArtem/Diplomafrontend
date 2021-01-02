import produce, { Draft } from "immer";
import { LoadingStatus } from "../../types";
import { CommentsActions } from "./ActionCreators";
import { CommentsActionType } from "./contracts/actionTypes";
import { CommentsState } from "./contracts/state";

const initialState: CommentsState = {
    items: [],
    LoadingStatus: LoadingStatus.NEVER,
}


export const CommentsReducer = produce((draft: Draft<any>, action: CommentsActions) => {
    switch(action.type) {
        case CommentsActionType.SET_COMMENTS:
            draft.items = action.payload;
       
        break;
        case CommentsActionType.SET_LOADING_STATE:
            draft.LoadingStatus = action.payload;
        break;
        case CommentsActionType.ADD_COMMENTS:
            draft.items.push(action.payload);
        break;
        case CommentsActionType.DELETE_COMMENTS:
            draft.items = draft.items.filter( ({_id} : any) => _id !== action.payload );
    }
}, initialState);