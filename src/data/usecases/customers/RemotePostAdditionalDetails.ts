import { CustomerDetailsAddedResponse } from "../../../domain/models/AdditionalDetailsResponse";
import HTTPStatusCode from "../../../domain/enums/HttpStatusCode";
import { HttpConstants } from "../../protocols/http/HttpConstants";
import { HttpPostClient } from "../../protocols/http/HttpPostClient";
import {
  AddAdditionalFields,
  AddAdditionalFieldsParams,
} from "../../../domain/usages/customers/AddAdditionalDetails";

export class RemotePostAdditionalDetails implements AddAdditionalFields {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}
  async post(
    customerId: string,
    params: AddAdditionalFieldsParams.Params
  ): Promise<CustomerDetailsAddedResponse> {
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
