import { Chip, IconButton, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import type { Playlist } from "../../../../models/Playlist";
import type { Song } from "../../../../models/Song";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useApiClient } from "../../../../hooks/useAPIClient";
import { removeFromPlaylist } from "../../../../api/PlaylistAPI";
import { useEffect } from "react";

interface PlaylistSongsListProps {
    playlist: Playlist,
    refreshPlaylists: () => Promise<void>,
}

export const PlaylistSongsList = ({playlist, refreshPlaylists}: PlaylistSongsListProps) => { 
  const api = useApiClient();

  const handleRemoveSong = async (song: Song) => {
    await removeFromPlaylist(api, song.id, playlist.id);
    refreshPlaylists(); 
  }
  
  return (
    <div>
      <Typography variant="h6">Songs in "{playlist.name}"</Typography>
      {playlist.songs.length === 0 ? (
        <Typography>No songs in this playlist.</Typography>
      ) : (
        <div  
          style={{
            maxHeight: '400px', 
            overflowY: 'auto',
            paddingRight: '8px',
          }}
        >
          <List dense>
            {playlist.songs.map((song: Song) => {
              return (
                <ListItem
                  key={song.id}
                  secondaryAction={<IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemoveSong(song)}
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>}
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
              );
            })}
          </List>
        </div>
      )}
    </div>
  );
}
