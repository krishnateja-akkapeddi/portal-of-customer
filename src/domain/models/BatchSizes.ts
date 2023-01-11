export interface BatchSizesResponse {
  success: boolean;
  batchSizes: Data;
  timestamp: number;
}
export interface Data {
  sizes?: SizeEntity[] | null;
}
export interface SizeEntity {
  size: number;
  message: string;
}
