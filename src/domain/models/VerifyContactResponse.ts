import { ErrorEntity } from "./Errors";

export interface ContactVerifiedResponse {
  success: boolean;
  data: Data;
  timestamp: number;
  errors?: ErrorEntity[];
}

export interface Data {
  message: string;
  verification: boolean;
}
