export class StorageUtil {
  static set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  static get<T>(key: string): T | null {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) as T : null;
  }
  static remove(key: string) {
    localStorage.removeItem(key);
  }
}
