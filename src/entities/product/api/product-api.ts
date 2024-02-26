import * as productDto from "../DTO/product-dto";
import { FetchService } from "@/shared/api/service";

const fethIds = ({ offset, limit }: productDto.GetIdsPayload) => {
  const action = "get_ids";

  return FetchService.post({ action, params: { offset, limit } });
};

const getItems = ({ ids }: productDto.GetItemsPayload) => {
  const action = "get_items";

  return FetchService.post({ action, params: { ids } });
};
const filterItems = ( params: productDto.GetFilterItemsPayload ) => {
  const action = "filter";

  return FetchService.post({ action, params });
};

export const productApi = {
  fethIds,
  getItems,
  filterItems,
};
