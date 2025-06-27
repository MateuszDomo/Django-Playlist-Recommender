import type { BaseModel } from '../models/BaseModel';

export interface BaseModelAPIResponseData {
  id: string,
}

export const transformBaseModelAPIResponse = (apiData: BaseModelAPIResponseData): BaseModel => {
    return {
      id: apiData.id,
    };
}

export interface BaseModelAPIRequestData {
  id: string,
}

export const transformBaseModelAPIRequest = (obj: BaseModel): BaseModelAPIRequestData => {
    return {
      id: obj.id,
    };
}