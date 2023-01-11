import { ImageRejectedResponse } from "../../models/RejectImageResponse";

export interface RejectImage {
  reject(
    customerId: string,
    imageId: string,
    params: RejectImage.Params
  ): Promise<ImageRejectedResponse>;
}

export namespace RejectImage {
  export type Params = {
    reasonCode: string;
  };
}
