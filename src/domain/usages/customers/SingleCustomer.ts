import { FetchedCustomerResponse } from "../../models/CustomerResponse";

export interface FetchSingleCustomer {
  fetch(
    id?: string,
    params?: FetchSingleCustomer.Params
  ): Promise<FetchedCustomerResponse>;
}
export namespace FetchSingleCustomer {
  export type Params = {};
}
