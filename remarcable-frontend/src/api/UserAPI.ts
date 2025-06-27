import type { User } from "../models/User";
import {  transformBaseModelAPIRequest, transformBaseModelAPIResponse, type BaseModelAPIRequestData, type BaseModelAPIResponseData } from "./BaseAPI";

export interface UserAPIResponseData extends BaseModelAPIResponseData {
    username: string,
}

export interface UserAPIRequestData extends BaseModelAPIRequestData {
    username: string,
}

export const transformUserAPIResponse = (apiData: UserAPIResponseData): User => {
    const base = transformBaseModelAPIResponse(apiData);
    return {
        ...base,
        username: apiData.username
    };
}

export const transformUserAPIRequest = (user: User): UserAPIRequestData => {
    const base = transformBaseModelAPIRequest(user);
    return {
        ...base,
        username: user.username
    };
}