import { Md5 } from "ts-md5";
export function encode(str: string): string {
  return Md5.hashStr(str);
}
