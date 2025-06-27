import { Divider } from "@mui/material";
import type { Playlist } from "../../../../models/Playlist"
import { PlaylistSongsList } from "./PlaylistSongsList";
import { RecommendedSongs } from "./RecommendedSongs";

interface PlaylistSongsProps {
    playlist: Playlist,
    refreshPlaylists: () => Promise<void>,
}

export const PlaylistSongs = ({playlist, refreshPlaylists}: PlaylistSongsProps) => {
  return (
    <div>
      <PlaylistSongsList playlist={playlist} refreshPlaylists={refreshPlaylists}/>     
      <Divider sx={{ my: 2 }} />
      <RecommendedSongs playlist={playlist} refreshPlaylists={refreshPlaylists}/>
    </div>
  );
}