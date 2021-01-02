import { RootState } from "../../store";
import { LoadingStatus } from "../../types";
import { UserState } from "./contracts/state";

export const selectUserState = (state: RootState): UserState => state.user;

export const selectUserData = (state: RootState): UserState['data'] => selectUserState(state).data;

export const selectUserSearch = (state: RootState): UserState['searchItems'] => selectUserState(state).searchItems;

export const selectUserStatus = (state: RootState): UserState['status'] => selectUserState(state).status;

export const selectAllUsersData = (state: RootState): UserState['dataUsers'] => selectUserState(state).dataUsers;

export const selectIsAuth = (state: RootState): boolean => !!selectUserState(state).data;

export const selectUserIsLoading = (state: RootState): boolean => selectUserState(state).status === LoadingStatus.LOADING;