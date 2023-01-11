import { ContactVerifiedResponse } from "../../models/VerifyContactResponse";

export interface VerifyFirmName {
  verify(
    customerId: string,
    firmNameId: string,
    params: VerifyFirmName.Params
  ): Promise<ContactVerifiedResponse>;
}

export namespace VerifyFirmName {
  export type Params = {};
}
