import produce, { Draft } from "immer";
import { LoadingStatus } from "../../types";
import { UserActions } from "./actionCreators";
import { UserActionsType } from "./contracts/actionTypes";
import { UserState } from "./contracts/state";

const initialUserState: UserState = {
    data: undefined,
    status: LoadingStatus.NEVER,
    dataUsers: undefined,
    searchItems: undefined
};

export const userReducer = produce((draft: Draft<UserState>, action: UserActions) => {
    switch (action.type) {
        case UserActionsType.SEARCH_USER:
            draft.searchItems = draft.dataUsers
            draft.searchItems = draft.searchItems?.filter( el => el.fullname.includes(action.payload) || el.username.includes(action.payload));
        break;
        case UserActionsType.SET_USER_DATA:
            draft.data = action.payload;
            draft.status = LoadingStatus.SUCCESS;
        break;

        case UserActionsType.SET_LOADING_STATE:
            draft.status = action.payload;
        break;
        
        case UserActionsType.SET_ALL_USERS_DATA:
            draft.dataUsers = action.payload;
        break;
        case UserActionsType.UPDATE_USER:
            if (action.payload.avatar) {
                if (draft.data) {
                    draft.data.avatar = action.payload.avatar
                }
                
            }
            else if (action.payload.fullname) {
                if (draft.data){
                    draft.data.fullname = action.payload.fullname
                    draft.data.discription = action.payload.discription
                }
               
            }

        break;

        default:
            break;
    }
}, initialUserState);