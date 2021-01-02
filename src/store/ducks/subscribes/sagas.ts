import { call, put, takeLatest } from "redux-saga/effects";
import { subscribeApi } from "../../../api/subscribeApi";
import { AddSubscribe, DeleteSubscribe, SetSubsctibes } from "./actionCreators";
import { SubscribeActionType } from "./contracts/actionTypes";



export function* fetchAddSubscribe ( {payload}: any) {
    try {
        const {data} = yield call(subscribeApi.AddSubscribe, payload);
        console.log(data);
        yield put(AddSubscribe(data));
    } catch (error) {
        
    }
}

export function* fetchDeleteSubscribe ( {payload}: any) {
    // try {
        if (window.confirm("Вы действительно хотите отписаться?")) {
            yield call(subscribeApi.DeleteSubscribe, payload);
            yield put(DeleteSubscribe(payload));
            console.log("SAGA" + payload);
            
            
        }
        else {
        }
    // } catch (error) {
    //    console.log(error);
    // }
}


export function* fecthSetSubscribes ( ) {
    try {
        const {data} = yield call (subscribeApi.GetSubscribes);
        yield put(SetSubsctibes(data));
    } catch (error) {
        
    }
}


export function* subscribeSaga() {
    yield takeLatest(SubscribeActionType.FETCH_ADD_SUBSCRIBE, fetchAddSubscribe);
    yield takeLatest(SubscribeActionType.FETCH_SET_SUBSCRIBES, fecthSetSubscribes);
    yield takeLatest(SubscribeActionType.FETCH_DELETE_SUBSCRIBES, fetchDeleteSubscribe);

   
}