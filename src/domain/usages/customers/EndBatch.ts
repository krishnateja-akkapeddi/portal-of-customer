import { EndBatchResponse } from "../../models/EndBatchResponse";

export interface EndBatch {
  end(params: EndBatchParams.Params): Promise<EndBatchResponse>;
}
export namespace EndBatchParams {
  export type Params = {
    type: string;
  };
}
