import { productApi } from "../api/product-api";
import type { ProductService } from "../application/port";

export const productAdapter: ProductService = {

  fethIds(payload) {
    return productApi.fethIds(payload)
  },
  getItems(payload) {
    return productApi.getItems(payload)
  },
  filterItems(payload) {
    return productApi.filterItems(payload)
  },

};
