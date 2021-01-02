import { axios } from "../core/axios";


export const subscribeApi = {

    async AddSubscribe(payload: any): Promise<void> {
        console.log(payload);
        const {data} = await axios.post<void>('/subscribes', payload);

        return data;
    },


    async GetSubscribes(): Promise<void> {
        const {data} = await axios.get<void>('/subscribes');

        return data;
    },

    async DeleteSubscribe(payload: any): Promise<void> {
        console.log(payload.author);

        await axios.delete('/subscribes/' + payload.author);
    },
    async GetMySubscribe (id: any): Promise<any> {
        const {data}  = await axios.get("/mysubscribes");
        return data;
     }
    

    

}