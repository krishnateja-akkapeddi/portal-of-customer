export interface CreateBatchResponse {
  success: boolean;
  data: Data;
  timestamp: number;
}

export interface Data {
  message: string;
}
