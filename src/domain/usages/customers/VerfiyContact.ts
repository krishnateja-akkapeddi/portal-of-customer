import { ContactVerifiedResponse } from "../../models/VerifyContactResponse";

export interface VerifyContact {
  verify(
    customerId: string,
    contactId: string,
    params: VerifyContact.Params
  ): Promise<ContactVerifiedResponse>;
}

export namespace VerifyContact {
  export type Params = {};
}
