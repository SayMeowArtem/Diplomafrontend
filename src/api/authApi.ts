
//@ts-ignore
import { RegisterFormProps } from "../components/RegisterModal";
import { LoginFormProps } from "../components/SignInForm";
import { axios } from "../core/axios";

export interface ResponseApi {
    status: string;
    data: any;
}

export const AuthApi = {
    async signIn( postData: LoginFormProps): Promise<ResponseApi> {
        const { data } = await axios.post<ResponseApi>('/auth/login', {username: postData.email, password: postData.password});
        return data;
    },
    async signUp( postData: RegisterFormProps): Promise<ResponseApi> {
        const {data} = await axios.post<ResponseApi>('/auth/register', { email: postData.email, username: postData.username, select: postData.select, fullname: postData.fullname, password: postData.password, password2: postData.password2})
        return data;
    },
    async getMe(): Promise<ResponseApi> {
        const {data } = await axios.get<ResponseApi>('/users/me');
        return data;
    },
    async getUsers(): Promise<ResponseApi> {
        const {data} = await axios.get<ResponseApi>('/users/all');
        return data;
    },
    async UpdateUser(payload: any): Promise<void> {
        await axios.patch("/user/me", payload);
    },
    async GetInfoForProfile (payload: any): Promise<any> {
       const {data}  = await axios.get("/profileinfo");
       return data;
    },
    async GetInfoUser (id: any): Promise<any> {
        const {data}  = await axios.get("/profile/" + id);
        return data;
     },
     async Verify (hash: any): Promise<any> {
         const {data} = await axios.get("/auth/verify?hash=" + hash);
         return data
     }
}