import { ImageRejectedResponse } from "../../../domain/models/RejectImageResponse";
import { RejectImage } from "../../../domain/usages/customers/RejectImage";
import HTTPStatusCode from "../../../domain/enums/HttpStatusCode";
import { HttpConstants } from "../../protocols/http/HttpConstants";
import { HttpPostClient } from "../../protocols/http/HttpPostClient";

export class RemoteRejectImage implements RejectImage {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}
  async reject(
    customerId: string,
    imageId: string,
    params?: RejectImage.Params
  ): Promise<ImageRejectedResponse> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url
        .replace(":customerId", customerId)
        .replace(":imageId", imageId),
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
