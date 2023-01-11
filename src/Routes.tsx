import React from "react";
import AuthFactory from "./main/customer/AuthFactory";
import CustomerProfilerFactory from "./main/customer/CustomerProfilerFactory";
import IsAuthenticatedFactory from "./main/customer/IsAuthenticatedFactory";

export const pageRoutes = {
  authenticate: "/",
  customerProfiling: "/profiler/data-entry/basic",
};

export interface AppRoute {
  path: string;
  name: string;
  component: React.ReactNode;
  children?: AppRoute[];
}

let indexRoutes: AppRoute[] = [
  {
    path: pageRoutes.authenticate,
    name: "Authenticate Page",
    component: <AuthFactory />,
  } as AppRoute,
  {
    path: pageRoutes.customerProfiling,
    name: "customer profiler",
    component: (
      <IsAuthenticatedFactory>
        <CustomerProfilerFactory />
      </IsAuthenticatedFactory>
    ),
  } as AppRoute,
];

export default indexRoutes;
