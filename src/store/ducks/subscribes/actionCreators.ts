import { AddSubscribeActionInterface, DeleteSubscribesActionInterface, FetchAddSubscribeActionInterface, FetchDeleteSubscribesActionInterface, FetchSetSubscribesActionInterface, SetSubscribesActionInterface, SubscribeActionType } from "./contracts/actionTypes";


export const AddSubscribe = (payload: any): AddSubscribeActionInterface => ({
    type: SubscribeActionType.ADD_SUBSCRIBE,
    payload
});

export const DeleteSubscribe = (payload: any): DeleteSubscribesActionInterface => ({
    type: SubscribeActionType.DELETE_SUBSCRIBE,
    payload
})

export const FetchDeleteSubscribe = (payload: any): FetchDeleteSubscribesActionInterface => ({
    type: SubscribeActionType.FETCH_DELETE_SUBSCRIBES,
    payload
})

export const FetchAddSubscribe = (payload: any): FetchAddSubscribeActionInterface => ({
    type: SubscribeActionType.FETCH_ADD_SUBSCRIBE,
    payload
})

export const SetSubsctibes = (payload: any ): SetSubscribesActionInterface => ({
    type: SubscribeActionType.SET_SUBSCRIBES,
    payload
})

export const FetchSetSubscribes = (payload: any): FetchSetSubscribesActionInterface => ({
    type: SubscribeActionType.FETCH_SET_SUBSCRIBES,
    payload
})


export type SubscribeActions = 
| AddSubscribeActionInterface
| SetSubscribesActionInterface 
| DeleteSubscribesActionInterface