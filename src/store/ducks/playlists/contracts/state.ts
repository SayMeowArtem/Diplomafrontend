import { LoadingStatus } from "../../../types";
import { User } from "../../user/contracts/state";

export enum FormState {
    LOADING = 'LOADING',
    ERROR = 'ERROR',
    NEVER = 'NEVER',
    SUCCESS = 'SUCCESS',
}


export interface Playlist {
    _id?: string;
    owner: User;
    title: string;
    coverURL: string;
    createdAt: string;
}

export interface PlaylistState {  
     items: Playlist[] | undefined;
     search: Playlist[] | undefined;
     LoadingStatus: LoadingStatus;
     addFormState: FormState;
     deleteFormState: FormState;
     updateFormState: FormState;
    }