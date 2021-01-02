import { axios } from "../core/axios";
import { Playlist } from "../store/ducks/playlists/contracts/state";

export interface Response<T> {
    status: string;
    data: T;
}

export const playlistsApi = {
    async GetChartData (): Promise<any> {
        const {data} = await axios.get("/chartdata");
     
        return data;
    },
    async GetChartData2 (): Promise<any> {
        const {data} = await axios.get("/chartdata2");
     
        return data;
    },
    async GetInfoForUsersPage (id: any): Promise<any> {
        const {data} = await axios.get("/infoCount/" + id);
     
        return data;
    },
    async GetPopularPlaylists (id: any): Promise<any> {
        const {data}  = await axios.get("/popular");
    
        return data;
    },
    async GetNewPlaylists (id: any): Promise<any> {
        const {data}  = await axios.get("/newplaylist");
        return data;
    },
    async getMyPlaylists(): Promise<Response<Playlist[]>> {
        const {data } = await axios.get<Response<Playlist[]>>('/playlists/my');
        return data;
    },
    async AddPlaylist(payload: any): Promise<Response<Playlist[]>> {
        const { data } = await axios.post<Response<Playlist[]>>('/playlists', payload);
        return data
    },
    async DeletePlaylist(id: any): Promise<void> {
        await axios.delete("/playlists/" + id)
    },
    async UpdatePlaylist(payload: any): Promise<void> {
        await axios.patch("/playlists/" + payload.id, payload);
    }
}
