import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Stack,
  Chip,
} from '@mui/material';
import type { Song } from '../../../../models/Song';
import { getSongs } from '../../../../api/SongAPI';
import { SongsFilter } from './SongFilter';
import type { SongDetailDialogState, SongFilters } from '../types';
import { SongDetailDialog } from './SongDetailDialog';
import { useApiClient } from '../../../../hooks/useAPIClient';

export const SongsComponent = () => {

  const [songs, setSongs] = useState<Song[]>([]);
  const [songDetailDialogState, setSongDetailDialogState] = useState<SongDetailDialogState>({dialogOpen: false, song: null});

  const api = useApiClient();

  useEffect(() => {
  async function fetchData() {
      try {
        const res: Song[] = await getSongs(api);
        setSongs(res);
      } catch (error) {
      }
  }
  fetchData();
  }, []);

  const onFilterChange = async (filters: SongFilters) => {
    const res: Song[] = await getSongs(api, filters);
    setSongs(res);
  }

  const selectSong = (song: Song) => {
    setSongDetailDialogState({dialogOpen: true, song: song});
  };

  const handleSongDetailClose = () => {
    setSongDetailDialogState({dialogOpen: false, song: null});
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column'}}>
      <Typography variant="h3" component="h2" gutterBottom>
      Explore Songs... :)
      </Typography>
      <SongsFilter  onFilterChange={onFilterChange}/>
      <TableContainer component={Paper} sx={{ marginTop: 2, flex: 1,   maxHeight: '70vh' }}>
        <Table >
          <TableHead>
            <TableRow sx={{
              position: 'sticky',
              top: 0,
              backgroundColor: '#f5f5f5',
              zIndex: 10,
            }}>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Artist</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Genre</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Tags</TableCell>
            </TableRow>
          </TableHead>

          <TableBody sx={{}}>
            {songs.map((song) => (
              <TableRow key={song.id} onClick={() => selectSong(song)} hover>
                <TableCell>{song.name}</TableCell>
                <TableCell>{song.artist.name}</TableCell>
                <TableCell>{song.genre.name}</TableCell>
                <TableCell>{song.description === "" ? "None" : song.description}</TableCell>
                <TableCell>
                  {song.tags.length > 0 ? (
                    <Stack direction="row" spacing={1}>
                      {song.tags.map(tag => (
                        <Chip key={tag.id} label={tag.name} size="small" />
                      ))}
                    </Stack>
                  ) : (
                    'None'
                  )}
          </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {
        songDetailDialogState.dialogOpen ? <SongDetailDialog
          song={songDetailDialogState.song}
          onClose={handleSongDetailClose}
        /> : <div/>
      }
    </div>
  );
};