import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Stack,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import type { Song } from '../../../models/Song';
import { useGetPlaylists} from '../../../hooks/useGetPlaylists';
import { addToPlaylist } from '../../../api/PlaylistAPI';
import { useApiClient } from '../../../hooks/useAPIClient';

interface SongDetailDialogProps {
  song: Song;
  onClose: () => void;
}

export const SongDetailDialog = ({
  song,
  onClose,
}: SongDetailDialogProps) => {

  const api = useApiClient();
  const {playlists} = useGetPlaylists();

  const handleAddToPlaylist = async (playlistId: string) => {
    await addToPlaylist(api, song.id, playlistId);
  }

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{song.name}</DialogTitle>
      <DialogContent dividers>
        <Typography variant="subtitle1" gutterBottom>
          Artist: {song.artist.name}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Genre: {song.genre.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {song.description || 'No description'}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }}>
          {song.tags.length > 0 ? (
            song.tags.map((tag) => <Chip key={tag.id} label={tag.name} size="small" />)
          ) : (
            <Typography variant="body2">No tags</Typography>
          )}
        </Stack>

        <FormControl fullWidth sx={{ mt: 3 }}>
          <InputLabel id="playlist-select-label">Add To Playlist</InputLabel>
          <Select
            labelId="playlist-select-label"
            value={''} // Always show placeholder
            label="Add To Playlist"
            onChange={(e) => handleAddToPlaylist(e.target.value)}
          >
            {playlists.map((pl) => (
              <MenuItem key={pl.id} value={pl.id}>
                {pl.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
    </Dialog>
  );
};