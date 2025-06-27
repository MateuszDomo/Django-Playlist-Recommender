import { Chip, IconButton, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import { useRecommendedSongs } from "../../../../hooks/useRecommendedSongs"
import type { Playlist } from "../../../../models/Playlist"
import type { Song } from "../../../../models/Song";
import AddIcon from '@mui/icons-material/Add';
import { useApiClient } from "../../../../hooks/useAPIClient";
import { addToPlaylist } from "../../../../api/PlaylistAPI";

interface RecommendedSongsProps {
    playlist: Playlist
    refreshPlaylists: () => Promise<void>,
}

export const RecommendedSongs = ({playlist, refreshPlaylists}: RecommendedSongsProps) => {
  const {songs} = useRecommendedSongs(playlist);

  const api = useApiClient();

  const handleAddSong = async (song: Song) => {
    await addToPlaylist(api, song.id, playlist.id);
    refreshPlaylists();
  }

  return (
    <div>
      <Typography variant="h6">Recommended Songs</Typography>
      {songs.length === 0 ? (
        <Typography>No songs to recommend.</Typography>
      ) : (
          <div  
            style={{
              maxHeight: '400px', // adjust as needed, e.g., 300-500px
              overflowY: 'auto',
              paddingRight: '8px', // optional, to avoid scrollbar overlapping content
            }}
          >
          <List dense>
            {songs.map((song: Song) => (
              <ListItem
                key={song.id}
                secondaryAction={
                  <IconButton edge="end" aria-label="add" onClick={() => handleAddSong(song)}>
                    <AddIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={song.name}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.primary">
                        {song.artist.name}
                      </Typography>
                      <br />
                      <Typography component="span" variant="body2" color="text.secondary">
                        Genre: {song.genre.name}
                      </Typography>
                      <br />
                      <Stack direction="row" spacing={0.5} mt={0.5}>
                        {song.tags.map((tag) => (
                          <Chip key={tag.id} label={tag.name} size="small" />
                        ))}
                      </Stack>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </div>
   
      )}
    </div>
  );
}