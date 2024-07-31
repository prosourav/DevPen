import { Buffer } from "buffer"

export const encode = (str = '') => {
  return Buffer.from(str, "binary").toString("base64")
}