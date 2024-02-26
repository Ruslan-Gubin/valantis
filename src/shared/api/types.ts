export type BaseFethOptionType = {
  method?: string;
  action: string;
  params: { price?: number; offset?: number; limit?: number; ids?: string[] };
};

export type ResponseOptions = {
  method: string;
  baseUrl: URL;
  headers: Record<string, string>;
  payload: {
    action: string;
    params: {
      price?: number | undefined;
      offset?: number | undefined;
      limit?: number | undefined;
      ids?: string[] | undefined;
    };
  };
};
