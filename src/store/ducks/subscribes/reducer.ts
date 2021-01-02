import produce, { Draft } from "immer";
import { SubscribeActions } from "./actionCreators";
import { SubscribeActionType } from "./contracts/actionTypes";
import { SubscribeState } from "./contracts/state";



const initialSubscribeState: SubscribeState = {
    items: [],
};

export const subscribeReducer = produce((draft: Draft<SubscribeState>, action: SubscribeActions) => {
    switch(action.type) {
        case SubscribeActionType.ADD_SUBSCRIBE:
            draft.items.push(action.payload);
        break;
        case SubscribeActionType.SET_SUBSCRIBES:
            draft.items = [];
            draft.items = action.payload;
        break;
        case SubscribeActionType.DELETE_SUBSCRIBE:
            draft.items = draft.items.filter( ({_id, subscriber, author} : any) => author !== action.payload.author );
        break;
        default:
            break;

    }
}, initialSubscribeState)