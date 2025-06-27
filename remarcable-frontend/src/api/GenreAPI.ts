import type { AxiosInstance } from "axios";
import type { Genre } from "../models/Genre";
import {  transformBaseModelAPIResponse, type BaseModelAPIResponseData } from "./BaseAPI";

export interface GenreAPIResponseData extends BaseModelAPIResponseData {
    name: string,
}

export const transformGenreAPIResponse = (apiData: GenreAPIResponseData): Genre => {
    const base = transformBaseModelAPIResponse(apiData);
    return {
        ...base,
        name: apiData.name
    };
}

export async function getGenres(api: AxiosInstance): Promise<Genre[]> {
  try {
    const response = await api.get('/api/genres/', {});
    return response.data.map((apiData: GenreAPIResponseData) => transformGenreAPIResponse(apiData));
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}