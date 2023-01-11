import { VerifyFirmName } from "../../../domain/usages/customers/VerifyFirmname";
import { ContactVerifiedResponse } from "../../../domain/models/VerifyContactResponse";
import { HttpConstants } from "../../protocols/http/HttpConstants";
import { HttpPostClient } from "../../protocols/http/HttpPostClient";

export class RemoteVerifyFirmName implements VerifyFirmName {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}
  async verify(
    customerId: string,
    firmNameId: string,
    params: VerifyFirmName.Params
  ): Promise<ContactVerifiedResponse> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url
        .replace(":customerId", customerId)
        .replace(":firmNameId", firmNameId),
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
