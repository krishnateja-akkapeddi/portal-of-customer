import { FetchedCustomerResponse } from "../../../domain/models/CustomerResponse";
import { FetchSingleCustomer } from "../../../domain/usages/customers/SingleCustomer";
import { HttpConstants } from "../../protocols/http/HttpConstants";
import { HttpGetClient } from "../../protocols/http/HttpGetClient";

export class RemoteFetchSingleCustomer implements FetchSingleCustomer {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient
  ) {}
  async fetch(
    id: string,
    params: FetchSingleCustomer.Params
  ): Promise<FetchedCustomerResponse> {
    const httpResponse = await this.httpGetClient.get({
      url: this.url.replace(":id", id),
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
