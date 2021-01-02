import { LoadingStatus } from "../../../types";


export interface User {
    _id?: string;
  email: string;
  fullname: string;
  username: string;
  password: string;
  confirmHash: string;
  avatar?: string;
  confirmed?: boolean;
  discription?: string;
  about?: string;
}

export interface UserState { data: User | undefined ; status: LoadingStatus; dataUsers: User[] | undefined; searchItems : User[] | undefined}