let REACT_APP_ENV = process.env.REACT_APP_ENV;
export const AUTH_HEADER_CUSTOMERSERVICE: string = "Authorization";
export const AUTH_HEADER_CHANNELPAY: string = "auth-token";
export const AUTH_API_URL = process.env.REACT_APP_AUTH_API_URL;
export const CUSTOMER_PROFILER_API_URL =
  REACT_APP_ENV === "dev"
    ? process.env.REACT_APP_CUSTOMER_PROFILER_STAGING_API_URL
    : process.env.REACT_APP_CUSTOMER_PROFILER_API_URL;

export const AUTH_TOKEN_KEY: any = process.env.REACT_APP_TOKEN_KEY;
export const AUTH_USER_KEY: any = process.env.REACT_APP_ROLE_KEY;
export const DEPT_AUTH_TOK: any = process.env.REACT_APP_MASTERS_TOK;
export const MASTERS_URL = process.env.REACT_APP_MASTERS_URL;
