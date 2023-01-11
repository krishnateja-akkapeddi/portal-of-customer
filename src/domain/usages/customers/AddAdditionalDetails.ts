import { CustomerDetailsAddedResponse } from "../../models/AdditionalDetailsResponse";

export interface AddAdditionalFields {
  post(
    customerId: string,
    params: AddAdditionalFieldsParams.Params
  ): Promise<CustomerDetailsAddedResponse>;
}

export namespace AddAdditionalFieldsParams {
  export type Params = {
    contacts?: { type: string; value: string }[];
    firmNames?: string[];
    gstNumber?: string;
    panNumber?: string;
  };
}
