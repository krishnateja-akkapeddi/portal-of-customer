import { EndBatchResponse } from "../../../domain/models/EndBatchResponse";
import {
  EndBatch,
  EndBatchParams,
} from "../../../domain/usages/customers/EndBatch";
import { HttpConstants } from "../../protocols/http/HttpConstants";
import { HttpPostClient } from "../../protocols/http/HttpPostClient";

export class RemoteEndBatch implements EndBatch {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}
  async end(params: EndBatchParams.Params): Promise<EndBatchResponse> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
      headers: {
        [HttpConstants.CONTENT_TYPE]: HttpConstants.APPLICATION_JSON,
        [HttpConstants.ACCEPT]: HttpConstants.APPLICATION_JSON,
      },
      authHeaders: true,
    });

    return httpResponse.data;
  }
}
