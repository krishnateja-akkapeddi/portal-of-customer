import { ContactVerifiedResponse } from "../../../domain/models/VerifyContactResponse";
import HTTPStatusCode from "../../../domain/enums/HttpStatusCode";
import { verifyGstNumber } from "../../../domain/usages/customers/VerifyGstNumber";
import { HttpConstants } from "../../protocols/http/HttpConstants";
import { HttpPostClient } from "../../protocols/http/HttpPostClient";

export class RemoteVerifyGst implements verifyGstNumber {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}
  async verify(
    customerId: string,
    params: verifyGstNumber.Params
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
