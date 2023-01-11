import { ErrorEntity } from "./Errors";

export interface FetchBatchSizesResponse {
  success: boolean;
  data: BatchSizes;
  timestamp: number;
  errors?: ErrorEntity[];
}

export interface BatchSizes {
  sizes?: SizeEntity[];
}

export interface SizeEntity {
  size: number;
  message: string;
}
