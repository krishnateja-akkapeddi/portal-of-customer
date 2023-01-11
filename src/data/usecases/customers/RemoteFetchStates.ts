import { FetchStates } from "../../../domain/usages/masters/States";
import HTTPStatusCode from "../../../domain/enums/HttpStatusCode";
import { HttpConstants } from "../../protocols/http/HttpConstants";
import { HttpGetClient } from "../../protocols/http/HttpGetClient";

export class RemoteFetchStates implements FetchStates {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient
  ) {}
  async fetch(): Promise<any> {
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
