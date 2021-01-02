import { RootState } from "../../store";
import { VideoState } from "./contacts/state";

export const SelectVideosState = (state: RootState): VideoState => state.videos;

export const SelectVideos = (state: RootState): VideoState['items'] => SelectVideosState(state).items;

export const SelectVideosStatus = (state: RootState): VideoState['LoadingStatus'] => SelectVideosState(state).LoadingStatus;

