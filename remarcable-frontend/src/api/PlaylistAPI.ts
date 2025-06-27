import type { AxiosInstance } from "axios";
import type { Playlist } from "../models/Playlist";
import type { Tag } from "../models/Tag";
import {  transformBaseModelAPIRequest, transformBaseModelAPIResponse, type BaseModelAPIRequestData, type BaseModelAPIResponseData } from "./BaseAPI";
import { transformSongAPIResponse, type SongAPIResponseData } from "./SongAPI";
import { transformUserAPIResponse, type UserAPIRequestData, type UserAPIResponseData } from "./UserAPI";

export interface PlaylistAPIResponseData extends BaseModelAPIResponseData {
    name: string,
    songs: SongAPIResponseData[],
    user: UserAPIResponseData
}

export const transformPlaylistAPIResponse = (apiData: PlaylistAPIResponseData): Playlist => {
    const base = transformBaseModelAPIResponse(apiData);
    return {
        ...base,
        name: apiData.name,
        songs: apiData.songs.map((data: SongAPIResponseData) => transformSongAPIResponse(data)),
        user: transformUserAPIResponse(apiData.user),
    };
}

export interface PlaylistAPIRequestData extends BaseModelAPIRequestData {
    name: string,
}

export const transformPlaylistAPIRequest = (obj: Playlist): PlaylistAPIRequestData => {
    const base = transformBaseModelAPIRequest(obj);
    return {
        ...base,
        name: obj.name,
    };
}

export async function getPlaylists(api: AxiosInstance, qp: {userSpecific: boolean}): Promise<Playlist[]> {
  try {
    const params: any = {}
    if (qp.userSpecific) {
        params.user_specific = qp.userSpecific;
    }
    const response = await api.get(`/api/playlists/`, {params});
    console.log(response)
    return response.data.map((apiData: PlaylistAPIResponseData) => transformPlaylistAPIResponse(apiData));
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}

export async function createPlaylist(api: AxiosInstance, playlistName: string): Promise<{message: string}> {
  try {
    const response = await api.post('/api/playlists/', {name: playlistName});
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}


export async function addToPlaylist(api: AxiosInstance, songId: string, playlistId: string): Promise<{message: string}> {
  try {
    const response = await api.post(`/api/playlists/${playlistId}/add-song/`, {song_id: songId});
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}