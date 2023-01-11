import { ContactVerifiedResponse } from "../../../domain/models/VerifyContactResponse";
import HTTPStatusCode from "../../../domain/enums/HttpStatusCode";
import { VerifyContact } from "../../../domain/usages/customers/VerfiyContact";
import { HttpConstants } from "../../protocols/http/HttpConstants";
import { HttpPostClient } from "../../protocols/http/HttpPostClient";

export class RemoteVerifyContact implements VerifyContact {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}
  async verify(
    customerId: string,
    contactId: string,
    params: VerifyContact.Params
  ): Promise<ContactVerifiedResponse> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url
        .replace(":customerId", customerId)
        .replace(":contactId", contactId),
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
