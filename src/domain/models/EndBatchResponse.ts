import { ErrorEntity } from "./Errors";

export interface EndBatchResponse {
  success: boolean;
  data: Data;
  errors?: ErrorEntity[];
  timestamp: number;
}
export interface Data {
  message: string;
}
