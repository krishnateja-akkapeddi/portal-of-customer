import { ErrorEntity } from "./Errors";

export interface ImageRejectedResponse {
  success: boolean;
  data: Data;
  timestamp: number;
  errors?: ErrorEntity[];
}

export interface Data {
  message: string;
  rejection: boolean;
}
