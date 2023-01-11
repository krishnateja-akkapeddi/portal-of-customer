import { DepartmentResponse } from "./../../models/DepartmentResponse";
export interface FetchDepartments {
  fetch(): Promise<DepartmentResponse>;
}
