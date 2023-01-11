import { CreateBatchResponse } from "./../../models/CreateBatchResponse";

export interface CreateBatch {
  create(params: CreateBatchParams.Params): Promise<CreateBatchResponse>;
}

export namespace CreateBatchParams {
  export type Params = {
    batchSize: number;
    type: string;
  };
}
