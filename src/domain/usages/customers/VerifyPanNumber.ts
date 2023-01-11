import { ContactVerifiedResponse } from "../../models/VerifyContactResponse";

export interface verifyPanNumber {
  verify(
    customerId: string,
    params: verifyPanNumber.Params
  ): Promise<ContactVerifiedResponse>;
}

export namespace verifyPanNumber {
  export type Params = {};
}
