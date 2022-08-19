import { isNullOrUndef } from "../is";

export class WebStorage {
  storage: any;
  prefixKey: string;
  constructor(option: any = {}) {
    this.storage = option.storage;
    this.prefixKey = option.prefixKey;
  }

  getKey(key) {
    return `${this.prefixKey}${key}`.toUpperCase();
  }

  set(key, value, expire) {
    const stringData = JSON.stringify({
      value,
      time: Date.now(),
      expire: expire ? new Date().getTime() + expire * 1000 : null,
    });
    console.log(stringData);
    console.log(this.getKey(key));
    this.storage.setItem(this.getKey(key), stringData);
  }

  get(key) {
    const { value } = this.getItem(key, {});
    return value;
  }

  getItem(key, def = null) {
    const val = this.storage.getItem(this.getKey(key));
    if (!val) return def;
    try {
      const data = JSON.parse(val);
      const { value, time, expire } = data;
      if (isNullOrUndef(expire) || expire > new Date().getTime()) {
        return { value, time };
      }
      this.remove(key);
      return def;
    } catch (error) {
      this.remove(key);
      return def;
    }
  }

  remove(key) {
    this.storage.removeItem(this.getKey(key));
  }

  clear() {
    this.storage.clear();
  }
}

export function createWebStorage({ prefixKey = "", storage = sessionStorage }) {
  return new WebStorage({ prefixKey, storage });
}
