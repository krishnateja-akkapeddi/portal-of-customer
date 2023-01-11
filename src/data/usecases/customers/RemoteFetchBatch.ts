import { FetchBatchSizesResponse } from "../../../domain/models/BatchSizesResponse";
import HTTPStatusCode from "../../../domain/enums/HttpStatusCode";
import { FetchBatchSizes } from "../../../domain/usages/customers/BatchSizes";
import { HttpConstants } from "../../protocols/http/HttpConstants";
import { HttpGetClient } from "../../protocols/http/HttpGetClient";

export class RemoteFetchBatchSizes implements FetchBatchSizes {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient
  ) {}
  async fetch(): Promise<FetchBatchSizesResponse> {
    const httpResponse = await this.httpGetClient.get({
      url: this.url,
      headers: {
        [HttpConstants.CONTENT_TYPE]: HttpConstants.APPLICATION_JSON,
        [HttpConstants.ACCEPT]: HttpConstants.APPLICATION_JSON,
      },
      authHeaders: true,
    });
    if (httpResponse.status == HTTPStatusCode.OK) {
      return httpResponse.data;
    }
    return httpResponse.data;
  }
}
