import { useEffect, useState } from "react";
import type { Playlist } from "../models/Playlist";
import { getPlaylists } from "../api/PlaylistAPI";
import { useApiClient } from "./useAPIClient";

export const useGetPlaylists = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const api = useApiClient();

  const fetchPlaylists = async () => {
    setLoading(true);
    try {
      const res = await getPlaylists(api, {userSpecific: true});
      console.log("res")
      console.log(res)
      setPlaylists(res);
    } catch (e) {
      console.log(e)
      setError('Failed to load playlists');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  return {
    playlists,
    loading,
    error,
    refresh: fetchPlaylists,
  };
};