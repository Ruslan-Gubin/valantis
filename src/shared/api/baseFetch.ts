import type { BaseFethOptionType, ResponseOptions } from "./types";
import { getHeaders, getResponse } from "./utils";

export const baseFeth = async ({
  action,
  params,
  method = "POST",
}: BaseFethOptionType) => {
  const password = "Valantis";
  const baseUrl = new URL("https://api.valantis.store:41000/");

  const payload = {
    action,
    params,
  };

  const headers = getHeaders(password);

  try {
    let response = await getResponse({ baseUrl, headers, method, payload });
    let count = 0;

    while (!response.ok && count < 5) {
      response = await getResponse({ baseUrl, headers, method, payload });
      count++;
    }

    if (!response.ok) {
      throw('Failed to feth')
    }

    const json = await response.json();

    return json;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
