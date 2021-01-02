import { LoadingStatus } from "../../../types";
import { User } from "../../user/contracts/state";



export interface Video {
    _id?: string;
    owner: User;
    title: string;
    url: string;
    playlist: string;
    createdAt: string;
    like?: string;
    views?: string;
    comments: [];
}

export interface VideoState {
    items: any;
    LoadingStatus: LoadingStatus.NEVER;
}