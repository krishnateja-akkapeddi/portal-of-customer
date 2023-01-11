import { AUTH_TOKEN_KEY } from "../../../Base";
import { LoggedInUser } from "../../../domain/usages/customers/LogIn";
import { JsonStorage } from "../../protocols/storage/JsonStorage";

// TODO:: User encryption to store user data to local storage.
export class LocalLoggedInUser implements LoggedInUser {
  tokenKey: string = AUTH_TOKEN_KEY;

  constructor(private readonly jsonStorage: JsonStorage) {}

  getToken(): string | null {
    let token = this.jsonStorage.get(this.tokenKey);
    if (token && token !== "") return token;
    return null;
  }

  setToken(token: string): void {
    this.jsonStorage.add(this.tokenKey, token);
  }

  logout(): void {
    this.jsonStorage.remove(this.tokenKey);
  }
}
