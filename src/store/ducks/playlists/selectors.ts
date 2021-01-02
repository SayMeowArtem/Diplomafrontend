import { RootState } from "../../store";
import { Playlist, PlaylistState } from "./contracts/state";


export const SelectPlaylistsState = (state: RootState): PlaylistState => state.playlists;

export const SelectMyPlaylists = (state: RootState): PlaylistState['items'] => SelectPlaylistsState(state).items;

export const SelectSearch = (state: RootState): PlaylistState['search'] => SelectPlaylistsState(state).search;

export const SelectMyPlaylistsStatus = (state: RootState): PlaylistState['LoadingStatus'] => SelectPlaylistsState(state).LoadingStatus;

export const SelectAddFormState = (state: RootState): PlaylistState['addFormState'] => SelectPlaylistsState(state).addFormState;

export const SelectDeleteFormState = (state: RootState): PlaylistState['deleteFormState'] => SelectPlaylistsState(state).deleteFormState;

export const SelectUpdateFormState = (state: RootState): PlaylistState['updateFormState'] => SelectPlaylistsState(state).updateFormState;