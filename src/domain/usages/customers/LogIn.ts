export interface LoggedInUser {
  logout(): void;
  setToken(token: string): void;
  getToken(): string | null;
}

export namespace LoggedInUser {
  export type Params = {};
}
