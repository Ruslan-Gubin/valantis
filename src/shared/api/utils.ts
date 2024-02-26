import crypto from "crypto-js";
import type { ResponseOptions } from "./types";

const createAuthHeader = (password: string) => {
  const date = new Date();
  const timestamp = date.toISOString().slice(0, 10).replace(/-/g, "");
  const authString = `${password}_${timestamp}`;
  return crypto.MD5(authString).toString();
};

export const getHeaders = (password: string) => {
  const authHeader = createAuthHeader(password);
  return {
    "X-Auth": authHeader,
    "Content-Type": "application/json",
  };
};

export const getResponse = async ({
  baseUrl,
  method,
  headers,
  payload,
}: ResponseOptions) => {
  try {
    return await fetch(baseUrl, {
      method,
      headers,
      body: JSON.stringify(payload),
    });
  } catch (error) {
    throw error;
  }
};
