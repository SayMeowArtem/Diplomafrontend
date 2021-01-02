import { RegisterFormProps } from "../../../components/RegisterModal";
import { LoginFormProps } from "../../../components/SignInForm";
import { ClearStoreActionInterface, FetchClearStoreActionInterface, fetchSetAllUsersDataActionInterface, FetchSignInActionInterface, FetchSignUpActionInterface, fetchUpdateUserActionInterface, searchUsersActionInterface, SetAllUsersDataActionInterface, SetUserDataActionInterface, SetUserLoadingStatusActionInterface, UserActionsType } from "./contracts/actionTypes";
import { UserState } from "./contracts/state";



export const SearchUsers = (payload: any): searchUsersActionInterface => ({
    type: UserActionsType.SEARCH_USER,
    payload
})

export const setAllUsers = (payload: any): SetAllUsersDataActionInterface => ({
    type: UserActionsType.SET_ALL_USERS_DATA,
    payload
})

export const fetchUpdateUser = (payload: any): fetchUpdateUserActionInterface => ({
    type: UserActionsType.UPDATE_USER,
    payload
})

export const ClearStore = (payload: any) : ClearStoreActionInterface => ({
    type: UserActionsType.ClearStore,
    payload
})
export const fetchSetAllUsers = (payload: any): fetchSetAllUsersDataActionInterface => ({
    type: UserActionsType.FETCH_SET_USERS_DATA,
    payload
})

export const setUserData = (payload: UserState['data']): SetUserDataActionInterface => ({
    type: UserActionsType.SET_USER_DATA,
    payload,
});

export const fetchSignIn = (payload: LoginFormProps): FetchSignInActionInterface => ({
    type: UserActionsType.FETCH_SIGN_IN,
    payload,
});

export const fetchSignUp = (payload: RegisterFormProps):FetchSignUpActionInterface => ({
    type: UserActionsType.FETCH_SIGN_UP,
    payload
});

export const fetchClearStore = (payload : any) : FetchClearStoreActionInterface => ({
    type: UserActionsType.FETCH_CLEAR_STORE,
    payload
})



export const setUserLoadingState = (payload: UserState['status']): SetUserLoadingStatusActionInterface => ({
    type: UserActionsType.SET_LOADING_STATE,
    payload,
})

export type UserActions = | SetUserDataActionInterface | SetUserLoadingStatusActionInterface | SetAllUsersDataActionInterface | ClearStoreActionInterface | fetchUpdateUserActionInterface | searchUsersActionInterface;