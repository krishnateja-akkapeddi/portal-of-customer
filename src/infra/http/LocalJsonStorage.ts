import { JsonStorage } from "../../data/protocols/storage/JsonStorage";

export class LocalJsonStorage implements JsonStorage {
  private static instance: LocalJsonStorage;

  /**
   * Singleton class private contructor and this is a private constructor
   */
  private constructor() {}

  /**
   * Singleton class create only once
   */
  public static getInstance(): LocalJsonStorage {
    if (!LocalJsonStorage.instance) {
      LocalJsonStorage.instance = new LocalJsonStorage();
    }
    return LocalJsonStorage.instance;
  }

  /**
   * Add key and value
   *FUSS
   * @param key
   * @param value
   */
  add(key: string, value: any): void {
    value = JSON.stringify(value);
    localStorage.setItem(key, value);
  }

  /**
   * Get value for key
   *
   * @param key
   * @returns
   */
  get(key: string): any {
    let value = localStorage.getItem(key);
    if (!value || value === "") return null;
    return JSON.parse(value);
  }

  /**
   * Remove value for key
   *
   * @param key
   */
  remove(key: string): void {
    localStorage.removeItem(key);
  }
}
