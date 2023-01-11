import { ErrorEntity } from "./Errors";
export interface ImageRejectionReasonsResponse {
  success: boolean;
  data: ImageRejectionReasons;
  errors?: ErrorEntity;
  timestamp: number;
}
export interface ImageRejectionReasons {
  reasons: ImageRejectionReasonEntity[];
}
export interface ImageRejectionReasonEntity {
  code: string;
  message: string;
}
