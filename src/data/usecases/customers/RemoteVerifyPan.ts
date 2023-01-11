import { ContactVerifiedResponse } from "../../../domain/models/VerifyContactResponse";
import { verifyPanNumber } from "../../../domain/usages/customers/VerifyPanNumber";
import { HttpConstants } from "../../protocols/http/HttpConstants";
import { HttpPostClient } from "../../protocols/http/HttpPostClient";

export class RemoteVerifyPan implements verifyPanNumber {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}
  async verify(
    customerId: string,
    params: verifyPanNumber.Params
  ): Promise<ContactVerifiedResponse> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url.replace(":id", customerId),
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
