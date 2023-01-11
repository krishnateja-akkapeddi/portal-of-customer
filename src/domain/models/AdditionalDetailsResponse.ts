import { ErrorEntity } from "./Errors";
import { Customer } from "./CustomerResponse";

export type CustomerDetailsAddedResponse = {
  success: boolean;
  data: Data;
  timestamp: number;
  errors: ErrorEntity[];
};

export type Data = {
  message: string;
  customer: Customer;
};
