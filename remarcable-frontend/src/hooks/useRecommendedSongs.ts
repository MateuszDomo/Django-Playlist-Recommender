import { useEffect, useState } from "react";
import type { Playlist } from "../models/Playlist";
import { getPlaylists, getRecommendedSongs } from "../api/PlaylistAPI";
import { useApiClient } from "./useAPIClient";
import type { Song } from "../models/Song";

export const useRecommendedSongs = (playlist: Playlist) => {

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);

  const api = useApiClient();

  const fetchPlaylists = async () => {
    setLoading(true);
    try {
      const res = await getRecommendedSongs(api, playlist);
      setSongs(res);
    } catch (e) {
      console.log(e)
      setError('Failed to load playlists');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, [playlist]);

  return {
    songs,
    loading,
    error,
    refresh: fetchPlaylists,
  };
};