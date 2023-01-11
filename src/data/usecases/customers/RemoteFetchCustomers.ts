import HTTPStatusCode from "../../../domain/enums/HttpStatusCode";
import { FetchCustomersResponse } from "../../../domain/models/CustomersResponse";
import { FetchCustomers } from "../../../domain/usages/customers/FetchCustomers";
import { HttpConstants } from "../../protocols/http/HttpConstants";
import { HttpGetClient } from "../../protocols/http/HttpGetClient";

export class RemoteFetchCustomers implements FetchCustomers {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient
  ) {}
  async fetch(
    page: string,
    params: FetchCustomers.Params
  ): Promise<FetchCustomersResponse> {
    const httpResponse = await this.httpGetClient.get({
      url: this.url.replace(":pageNumber", page),
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
