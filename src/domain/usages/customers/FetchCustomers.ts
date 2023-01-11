import { FetchCustomersResponse } from "../../models/CustomersResponse";

export interface FetchCustomers {
  fetch(
    page?: string,
    params?: FetchCustomers.Params
  ): Promise<FetchCustomersResponse>;
}

export namespace FetchCustomers {
  export type Params = {
    state: string;
    deptCode: string;
  };
}
