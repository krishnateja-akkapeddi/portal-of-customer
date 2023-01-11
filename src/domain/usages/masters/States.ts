import { stateResponse } from "./../../models/StateResponse";
export interface FetchStates {
  fetch(): Promise<stateResponse>;
}
