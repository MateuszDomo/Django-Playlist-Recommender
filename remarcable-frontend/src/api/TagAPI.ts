import type { AxiosInstance } from "axios";
import type { Tag } from "../models/Tag";
import { transformBaseModelAPIResponse, type BaseModelAPIResponseData } from "./BaseAPI";

export interface TagAPIResponseData extends BaseModelAPIResponseData {
    name: string,
    user_created: boolean,
}

export const transformTagAPIResponse = (apiData: TagAPIResponseData): Tag => {
    const base = transformBaseModelAPIResponse(apiData);
    return {
        ...base,
        name: apiData.name,
        userCreated: apiData.user_created,
    };
}

export async function getTags(api: AxiosInstance): Promise<Tag[]> {
  try {
    const response = await api.get('/api/tags/', {});
    return response.data.map((apiData: TagAPIResponseData) => transformTagAPIResponse(apiData));
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}