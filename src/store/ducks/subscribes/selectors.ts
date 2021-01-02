import { RootState } from "../../store";
import { SubscribeState } from "./contracts/state";


export const SelectSubscribeState = (state: RootState): SubscribeState => state.subscribes;

export const SelectSubscribes= (state: RootState): SubscribeState['items'] => SelectSubscribeState(state).items;