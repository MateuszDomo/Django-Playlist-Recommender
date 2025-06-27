import type { Artist } from "../models/Artist";
import type { Genre } from "../models/Genre";
import { transformBaseModelAPIResponse, type BaseModelAPIResponseData } from "./BaseAPI";

export interface ArtistAPIResponseData extends BaseModelAPIResponseData {
    name: string,
}

export const transformArtistAPIResponse = (apiData: ArtistAPIResponseData): Artist => {
    const base = transformBaseModelAPIResponse(apiData);
    return {
        ...base,
        name: apiData.name
    };
}