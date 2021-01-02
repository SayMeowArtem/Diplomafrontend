import { Action } from "redux";
import { FormState, Playlist, PlaylistState } from "./state";
import { LoadingStatus } from '../../../types';


export enum PlaylistsActionType {
    SET_MY_PLAYLISTS = 'playlists/SET_MY_PLAYLISTS',
    SET_LOADING_STATE = 'playlists/SET_LOADING_STATE',
    FETCH_SET_MY_PLAYLISTS = 'playlists/FETCH_SET_MY_PLAYLISTS',
    ADD_PLAYLIST = 'playlists/ADD_PLAYLIST',
    FETCH_ADD_PLAYLIST = 'playlists/FETCH_ADD_PLAYLIST',
    SET_ADD_FORM_STATE = 'playlists/SET_ADD_FORM_STATE',
    DELETE_PLAYLIST = 'playlists/DELETE_PLAYLIST',
    UPDATE_PLAYLIST = 'playlist/UPDATE_PLAYLIST',
    FETCH_DELETE_PLAYLIST = 'playlists/FETCH_DELETE_PLAYLIST',
    FETCH_UPDATE_PLAYLIST = 'playlists/FETCH_UPDATE_PLAYLIST',
    SEARCH_PLAYLIST = 'playlists/SEARCH'
}

export interface SearchPlaylistsActionInterface extends Action<PlaylistsActionType> {
    type: PlaylistsActionType.SEARCH_PLAYLIST,
    payload: string
}


export interface DeletePlaylistActionInterface extends Action<PlaylistsActionType> {
    type: PlaylistsActionType.DELETE_PLAYLIST,
    payload: string
}


export interface SetMyPlaylistsActionInterface extends Action<PlaylistsActionType> {
    type: PlaylistsActionType.SET_MY_PLAYLISTS,
    payload: PlaylistState['items'];
}

export interface AddPlaylistActionInterface extends Action<PlaylistsActionType> {
    type: PlaylistsActionType.ADD_PLAYLIST;
    payload: Playlist
}

export interface UpdatePlaylistActionInterface extends Action<PlaylistsActionType> {
    type: PlaylistsActionType.UPDATE_PLAYLIST,
    payload: any
}


export interface SetAddFormStateActionInterface extends Action<PlaylistsActionType> {
    type: PlaylistsActionType.SET_ADD_FORM_STATE;
    payload: FormState
}

export interface SetPlaylistsLoadingStatusActionInterface extends Action<PlaylistsActionType> {
    type: PlaylistsActionType.SET_LOADING_STATE,
    payload:LoadingStatus;
}

export interface FetchUpdatePlaylistActionInterface extends Action<PlaylistsActionType> {
    type: PlaylistsActionType.FETCH_UPDATE_PLAYLIST;
    payload: any;
}

export interface FetchAddPlaylistActionInterface extends Action<PlaylistsActionType> {
    type: PlaylistsActionType.FETCH_ADD_PLAYLIST;

}

export interface FetchSetMyPlaylistsActionInterface extends Action<PlaylistsActionType> {
    type: PlaylistsActionType.FETCH_SET_MY_PLAYLISTS,
}


export interface FetchDeletePlaylistActionInter extends Action<PlaylistsActionType> {
    type: PlaylistsActionType.FETCH_DELETE_PLAYLIST
    payload: string
}