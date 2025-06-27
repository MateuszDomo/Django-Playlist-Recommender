
import type { AxiosInstance } from "axios";
import type { Song } from "../models/Song";
import type { SongFilters } from "../pages/HomePage/Components/types";
import { transformArtistAPIResponse, type ArtistAPIResponseData } from "./ArtistAPI";
import { transformBaseModelAPIResponse, type BaseModelAPIResponseData } from "./BaseAPI";
import { transformGenreAPIResponse, type GenreAPIResponseData } from "./GenreAPI";
import { transformTagAPIResponse, type TagAPIResponseData } from "./TagAPI";

export interface SongAPIResponseData extends BaseModelAPIResponseData {
    name: string,
    genre: GenreAPIResponseData,
    artist: ArtistAPIResponseData,
    description: string,
    tags: TagAPIResponseData[],
}

export const transformSongAPIResponse = (apiData: SongAPIResponseData): Song => {
    const base = transformBaseModelAPIResponse(apiData);
    return {
        ...base,
        name: apiData.name,
        genre: transformGenreAPIResponse(apiData.genre),
        artist: transformArtistAPIResponse(apiData.artist),
        description: apiData.description,
        tags: apiData.tags.map((tagData: TagAPIResponseData) => transformTagAPIResponse(tagData))
    };
}

export async function getSongs(api: AxiosInstance, filters?: SongFilters): Promise<Song[]> {
  try {
    const params: any = {};
    if (filters?.genreIds && filters.genreIds.length > 0) {
      params.genres = filters.genreIds;
    }
    if (filters?.tagIds && filters.tagIds.length > 0) {
      params.tags = filters.tagIds;
    }
    if (filters?.search && filters.search !== "") {
      params.search = filters.search;
    }

    const response = await api.get('/api/songs/', {params});
    return response.data.map((apiData: SongAPIResponseData) => transformSongAPIResponse(apiData));
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}