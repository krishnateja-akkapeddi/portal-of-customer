import { ErrorEntity } from "./Errors";
type firmNames = {
  name?: string;
  source?: string;
};

type FetchedCustomer = {
  _id?: string;
  firmNames?: firmNames[];
  errors?: ErrorEntity[];
};
export type fetchedCustomers = FetchedCustomer[];

export interface FetchCustomersResponse {
  success: boolean;
  data: Data;
  errors?: ErrorEntity[];
  timestamp: number;
}
export interface Data {
  result: ResultEntity[];
  total: number;
  limit: number;
  page: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalPages: number;
}
export interface ResultEntity {
  _id: string;
  firmNames: FirmNameEntity[];
}
export interface FirmNameEntity {
  name: string;
  source: string;
  verification?: null;
  _id: string;
}
