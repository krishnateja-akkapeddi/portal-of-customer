import { ImageRejectionReasonsResponse } from "../../models/ImageRejectionReasons";

export interface FetchImageRejectionReasons {
  fetch(
    params?: FetchImageRejectionReasons.Params
  ): Promise<ImageRejectionReasonsResponse>;
}

export namespace FetchImageRejectionReasons {
  export type Params = {};
}
