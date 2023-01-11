import {
  ImageRejectionReasons,
  ImageRejectionReasonsResponse,
} from "../../../domain/models/ImageRejectionReasons";
import HTTPStatusCode from "../../../domain/enums/HttpStatusCode";
import { FetchImageRejectionReasons } from "../../../domain/usages/customers/ImageRejectionReasons";
import { HttpConstants } from "../../protocols/http/HttpConstants";
import { HttpGetClient } from "../../protocols/http/HttpGetClient";

export class RemoteFetchImageRejectionReasons
  implements FetchImageRejectionReasons
{
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient
  ) {}
  async fetch(
    params: FetchImageRejectionReasons.Params
  ): Promise<ImageRejectionReasonsResponse> {
    const httpResponse = await this.httpGetClient.get({
      url: this.url,
      query: params,
      headers: {
        [HttpConstants.CONTENT_TYPE]: HttpConstants.APPLICATION_JSON,
        [HttpConstants.ACCEPT]: HttpConstants.APPLICATION_JSON,
      },
      authHeaders: true,
    });
    return httpResponse.data;
  }
}
