import produce, { Draft } from "immer";
import Playlist from "../../../components/Playlist/Playlist";
import { LoadingStatus } from "../../types";
import { UserActionsType } from "../user/contracts/actionTypes";
import { PlaylistActions, setPlaylistsLoadingState } from "./actionCreators";
import { PlaylistsActionType } from "./contracts/actionTypes";
import { FormState,  PlaylistState } from "./contracts/state";


const initialPlaylistsState: PlaylistState = {
    items: [],
    search: [],
    LoadingStatus: LoadingStatus.NEVER,
    addFormState: FormState.NEVER,
    deleteFormState: FormState.NEVER,
    updateFormState: FormState.NEVER,
};

export const playlistsReducer = produce((draft: Draft<PlaylistState>, action: PlaylistActions) => {
    switch(action.type) {
        case PlaylistsActionType.SEARCH_PLAYLIST:
                draft.search = draft.items
                draft.search = draft.search?.filter( el => el.title.includes(action.payload));
        break;
        case PlaylistsActionType.SET_MY_PLAYLISTS:
            draft.items = action.payload;
            draft.LoadingStatus = LoadingStatus.SUCCESS;
        break;
        case PlaylistsActionType.DELETE_PLAYLIST:
           draft.items?.filter(el => el._id !== action.payload);
           draft.deleteFormState = FormState.SUCCESS;
        break;
        case PlaylistsActionType.ADD_PLAYLIST:
            draft.items?.push(action.payload);
            draft.addFormState = FormState.SUCCESS;
        break;
        case PlaylistsActionType.UPDATE_PLAYLIST:
            // draft.items?.forEach( el => {
            //     if (el._id === action.payload.id) {
            //         el.title = action.payload.title;
            //         el.coverURL = action.payload.coverURL;
            //     }
            // })
        break;
        case PlaylistsActionType.SET_ADD_FORM_STATE: 
            draft.addFormState = action.payload;
        
        break;
        case PlaylistsActionType.FETCH_UPDATE_PLAYLIST:
            draft.updateFormState = action.payload;
        break;
     
        case PlaylistsActionType.SET_LOADING_STATE:
            draft.LoadingStatus = action.payload;
        break;
        case PlaylistsActionType.FETCH_ADD_PLAYLIST:
            draft.addFormState = FormState.LOADING;
        break;
        case PlaylistsActionType.FETCH_DELETE_PLAYLIST:
            draft.deleteFormState = FormState.LOADING;
        break;
   
        
        default:
            break;

    }
}, initialPlaylistsState)