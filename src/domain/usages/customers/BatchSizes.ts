import { FetchBatchSizesResponse } from "../../models/BatchSizesResponse";

export interface FetchBatchSizes {
  fetch(
    page?: string,
    params?: FetchBatchSizesParams.Params
  ): Promise<FetchBatchSizesResponse>;
}

export namespace FetchBatchSizesParams {
  export type Params = {
    state: string;
    deptCode: string;
  };
}
