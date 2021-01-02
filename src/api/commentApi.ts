import { axios } from "../core/axios";


export const CommentsApi = {
    async getComments(videoID: string): Promise<void> {
        const {data} =  await axios.get('/comments/' + videoID);
        return data;
    },
    async addComment(payload: any): Promise<void> {
        console.log(payload);
        const { data } = await axios.post<void>('/comments', payload);
        
        return data
    },
    async DeleteComment(id: any): Promise<void> {
        await axios.delete("/comments/" + id)
    },
}