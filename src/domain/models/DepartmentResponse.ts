import { ErrorEntity } from "./Errors";

export interface Department {
  _id: string;
  code: string;
  name: string;
  orgCode: string;
  orgName: string;
  createdAt: string;
  updatedAt: string;

  __v: number;
}

export type DepartmentResponse = {
  success: boolean;
  errors: ErrorEntity[];
  data: Department[];
};
