import {  baseFeth } from "./baseFetch";
import type { BaseFethOptionType } from "./types";

export class FetchService {
  static post({ action, method, params}: BaseFethOptionType) {
    return baseFeth({ action, method, params })
  }
}