import HTTPStatusCode from "../../../domain/enums/HttpStatusCode";
import {
  CreateBatch,
  CreateBatchParams,
} from "../../../domain/usages/customers/CreateBatch";
import { HttpConstants } from "../../protocols/http/HttpConstants";
import { HttpPostClient } from "../../protocols/http/HttpPostClient";

export class RemoteCreateBatch implements CreateBatch {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}
  async create(params: CreateBatchParams.Params): Promise<any> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
      headers: {
        [HttpConstants.CONTENT_TYPE]: HttpConstants.APPLICATION_JSON,
        [HttpConstants.ACCEPT]: HttpConstants.APPLICATION_JSON,
      },
      authHeaders: true,
    });

    if (
      httpResponse.status == HTTPStatusCode.OK ||
      HTTPStatusCode.BAD_REQUEST
    ) {
      return httpResponse.data;
    }
  }
}
