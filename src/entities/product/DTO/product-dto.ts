export type ProductModel = {
  brand: string;
  id: string;
  price: number;
  product: string;
};

export type GetIdsPayload = {
  offset: number;
  limit: number;
};

export type GetIdsResponse = {
  result: string[];
};

export type GetItemsPayload = {
  ids: string[];
};

export type GetItemsResponse = {
  result: ProductModel[];
};

export type GetFilterItemsPayload = {
  price?: number;
  product?: string;
  brand?: string;
};

export type GetFilterItemsResponse = {
  result: string[];
};
