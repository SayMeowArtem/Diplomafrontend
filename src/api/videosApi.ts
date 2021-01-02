import { axios } from "../core/axios";


export const videosApi = {
    async getVideosbyID(playlistId: string): Promise<void> {
        const {data} = await axios.get(/videos/ + playlistId);
        console.log(data);
        return data;
    },
    async DeleteVideo(id: any): Promise<void> {
        await axios.delete("/videos/" + id)
    },
    async UpdateVideo(payload: any): Promise<void> {
        
        await axios.patch("/videos/" + payload.id, payload);
    },
    async AddVideos(payload: any): Promise<void> {
        
        const { data } = await axios.post<void>('/videos', payload.payload);
      
        return data
    },
    async showVideo(Id: any): Promise<void> {
        const {data} = await axios.get(/video/ + Id);
        return data;
    },
    async PlusViews(Id: any): Promise<void> {
        await axios.patch("/video/" + Id);
    }

}
