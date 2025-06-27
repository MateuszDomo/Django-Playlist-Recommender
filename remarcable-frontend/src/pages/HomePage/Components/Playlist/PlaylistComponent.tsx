import  { useEffect, useState } from 'react';
import { 
  List, ListItem, ListItemText, Paper, Typography, 
  CircularProgress, TextField, Button, Stack, Divider
} from '@mui/material';
import type { Playlist } from '../../../../models/Playlist';
import type { Song } from '../../../../models/Song';
import { useGetPlaylists } from '../../../../hooks/useGetPlaylists';
import { createPlaylist } from '../../../../api/PlaylistAPI';
import { useApiClient } from '../../../../hooks/useAPIClient';
import { PlaylistSongsList } from './PlaylistSongsList';
import { PlaylistSongs } from './PlaylistSongs';

export const PlaylistComponent = () => {
  const { playlists, refresh } = useGetPlaylists();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);

  useEffect(() => {
    if (selectedPlaylist) {
      const updated = playlists.find(p => p.id === selectedPlaylist.id);
      if (updated) {
        setSelectedPlaylist(updated);
      }
    }
  }, [playlists]);

  const api = useApiClient();

  const handleCreate = async () => {
    if (!newPlaylistName.trim()) return;
    setLoading(true);
    setError(null);
    try {
      await createPlaylist(api, newPlaylistName.trim());
      setNewPlaylistName('');
      await refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to create playlist');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPlaylist = (playlist: Playlist) => {
    if (playlist.id === selectedPlaylist?.id) {
      setSelectedPlaylist(null);
    } else {
      setSelectedPlaylist(playlist);
    }
  }

  return (
    <Paper sx={{ padding: 2, maxWidth: 600 }}>
      <Typography variant="h5" gutterBottom>
        Your Playlists
      </Typography>

      <Stack direction="row" spacing={2} mb={2}>
        <TextField
          label="New Playlist Name"
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
          fullWidth
          size="small"
        />
        <Button variant="contained" onClick={handleCreate} disabled={loading || !newPlaylistName.trim()}>
          Add
        </Button>
      </Stack>

      {playlists.length === 0 ? (
        <Typography>No playlists found.</Typography>
      ) : (
        <List>
          {playlists.map((playlist) => (
            <ListItem 
              key={playlist.id} 
              onClick={() => handleSelectPlaylist(playlist)}
            >
              <ListItemText primary={playlist.name} />
            </ListItem>
          ))}
        </List>
      )}

      {selectedPlaylist && (
        <>
          <Divider sx={{ my: 2 }} />
          <PlaylistSongs playlist={selectedPlaylist} refreshPlaylists={refresh} /> 
        </>
      )}
    </Paper>
  );
};