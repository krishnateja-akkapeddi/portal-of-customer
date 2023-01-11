import { ContactVerifiedResponse } from "../../models/VerifyContactResponse";

export interface verifyGstNumber {
  verify(
    customerId: string,
    params: verifyGstNumber.Params
  ): Promise<ContactVerifiedResponse>;
}

export namespace verifyGstNumber {
  export type Params = {};
}
