import { RootState } from "../../store";
import { CommentsState } from "./contracts/state";


export const SelectCommentsState = (state: RootState): CommentsState => state.comments;

export const SelectComments = (state: RootState): CommentsState['items'] => SelectCommentsState(state).items;

export const SelectCommentsStatus = (state: RootState):CommentsState['LoadingStatus'] => SelectCommentsState(state).LoadingStatus;

