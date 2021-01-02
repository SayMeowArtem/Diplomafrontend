import { AddPlaylistActionInterface, DeletePlaylistActionInterface, FetchAddPlaylistActionInterface, FetchDeletePlaylistActionInter, FetchSetMyPlaylistsActionInterface, FetchUpdatePlaylistActionInterface, PlaylistsActionType, SearchPlaylistsActionInterface, SetAddFormStateActionInterface, SetMyPlaylistsActionInterface, SetPlaylistsLoadingStatusActionInterface, UpdatePlaylistActionInterface } from "./contracts/actionTypes";
import { FormState,   PlaylistState } from "./contracts/state";


export const SearchPlaylist = (payload: any): SearchPlaylistsActionInterface => ({
    type: PlaylistsActionType.SEARCH_PLAYLIST,
    payload
})

export const SetMyPlaylists =  (payload: PlaylistState['items']): SetMyPlaylistsActionInterface => ({
    type: PlaylistsActionType.SET_MY_PLAYLISTS,
    payload
});


export const setPlaylistsLoadingState = (payload: PlaylistState['LoadingStatus']): SetPlaylistsLoadingStatusActionInterface => ({
    type: PlaylistsActionType.SET_LOADING_STATE,
    payload,
});

export const AddPlaylist = (payload: any): AddPlaylistActionInterface => ({
    type: PlaylistsActionType.ADD_PLAYLIST,
    payload
});

export const setAddFormState = (payload: FormState): SetAddFormStateActionInterface => ({
    type: PlaylistsActionType.SET_ADD_FORM_STATE,
    payload
})

export const deletePlaylist = (payload : string): DeletePlaylistActionInterface => ({
    type: PlaylistsActionType.DELETE_PLAYLIST,
    payload
})

export const UpdatePlaylist = (payload: any): UpdatePlaylistActionInterface => ({
    type: PlaylistsActionType.UPDATE_PLAYLIST,
    payload
})

export const fetchUpdatePlaylist = (payload: any): FetchUpdatePlaylistActionInterface => ({
    type: PlaylistsActionType.FETCH_UPDATE_PLAYLIST,
    payload
})

export const fetchDletePlaylist = (payload: string): FetchDeletePlaylistActionInter => ({
    type: PlaylistsActionType.FETCH_DELETE_PLAYLIST,
    payload
})

export const fetchAddPlaylist = (payload: any): any => ({
    type: PlaylistsActionType.FETCH_ADD_PLAYLIST,
    payload
})

export const fetchMyPlaylistsData = (): FetchSetMyPlaylistsActionInterface => ({
    type: PlaylistsActionType.FETCH_SET_MY_PLAYLISTS
})

export type PlaylistActions = 
| SetMyPlaylistsActionInterface
| SetPlaylistsLoadingStatusActionInterface 
| FetchSetMyPlaylistsActionInterface 
| AddPlaylistActionInterface
| FetchAddPlaylistActionInterface
| SetAddFormStateActionInterface
| FetchDeletePlaylistActionInter
| DeletePlaylistActionInterface
| FetchUpdatePlaylistActionInterface
| UpdatePlaylistActionInterface
| SearchPlaylistsActionInterface
