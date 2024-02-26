import type * as productDto from "../DTO/product-dto";

export interface ProductService {
  fethIds: (payload: productDto.GetIdsPayload) => unknown;
  getItems: (payload: productDto.GetItemsPayload) => unknown;
  filterItems: (payload: productDto.GetFilterItemsPayload) => unknown;
}
