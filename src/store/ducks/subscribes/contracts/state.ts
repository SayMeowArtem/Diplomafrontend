

export interface Subscribe {
    _id?: string;
    author: string;
    subscriber: string;
    createdAt: string;
}

export interface SubscribeState {  
     items: Subscribe[] ;
}

