import { LoadingStatus } from "../../../types";
import { User } from "../../user/contracts/state";




export interface Comments {
    _id?: string;
    owner: User;
    text: string;
    createdAt: string;
}

export interface CommentsState {  
     items: Comments[] | undefined;
     LoadingStatus: LoadingStatus.NEVER;
}