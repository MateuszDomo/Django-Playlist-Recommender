import { useEffect, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box, TextField } from '@mui/material';
import type { Genre } from '../../../models/Genre';
import type { Tag } from '../../../models/Tag';
import { getTags } from '../../../api/TagAPI';
import { getGenres } from '../../../api/GenreAPI';
import type { SongFilters } from './types';
import { useApiClient } from '../../../hooks/useAPIClient';

interface Props {
  onFilterChange: (filters: SongFilters) => void;
}

export const SongsFilter = ({ onFilterChange }: Props) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [search, setSearch] = useState<string>("");
  const [selectedGenreIds, setSelectedGenreIds] = useState<string[]>([]);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);

  const api = useApiClient();

  useEffect(() => {
    async function fetchData() {
      try {
        const tagsRes = await getTags(api);
        const genresRes = await getGenres(api);
        setTags(tagsRes);
        setGenres(genresRes);
      } catch (error) {
        console.log('Error fetching filters', error);
      }
    }
    fetchData();
  }, []);

  const handleGenreChange = (event: any) => {
    const value = event.target.value as string[];
    setSelectedGenreIds(value);
    onFilterChange({ genreIds: value, tagIds: selectedTagIds });
  };

  const handleTagChange = (event: any) => {
    const value = event.target.value as string[];
    setSelectedTagIds(value);
    onFilterChange({ genreIds: selectedGenreIds, tagIds: value });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    onFilterChange({ genreIds: selectedGenreIds, tagIds: selectedTagIds, search: value });
  };


  return (
    <Box display="flex" gap={2} marginBottom={2}>
        <TextField
        label="Search"
        variant="outlined"
        size="small"
        value={search}
        onChange={handleSearchChange}
        sx={{
          minWidth: 200,
          backgroundColor: '#282c34',
          input: { color: 'white' },
          label: { color: 'white' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white',
            },
          },
        }}
      />
      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel sx={{color: 'white'}}>Genres</InputLabel>
        <Select
          sx={{          
            width: "200px",
            backgroundColor: '#282c34',
            color: 'white',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          multiple
          value={selectedGenreIds}
          label="Genres"
          onChange={handleGenreChange}
          renderValue={(selected) =>
            genres
              .filter((g) => selected.includes(g.id))
              .map((g) => g.name)
              .join(', ')
          }
        >
          {genres.map((genre) => (
            <MenuItem 
              key={genre.id} 
              value={genre.id}
              sx={{
                  backgroundColor: selectedGenreIds.includes(genre.id) ? 'rgba(25, 118, 210, 0.2)' : 'inherit',
                  '&.Mui-selected': {
                  backgroundColor: 'rgba(25, 118, 210, 0.4)',
                  },
                  '&.Mui-selected:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.6)',
                  },
              }}
            >
              {genre.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel sx={{color: 'white'}}>Tags</InputLabel>
        <Select
          sx={{          
            maxWidth: "200px",
            backgroundColor: '#282c34',
            color: 'white',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          multiple
          value={selectedTagIds}
          label="Tags"
          onChange={handleTagChange}
          renderValue={(selected) =>
            tags
              .filter((t) => selected.includes(t.id))
              .map((t) => t.name)
              .join(', ')
          }
        >
          {tags.map((tag) => (
            <MenuItem 
              key={tag.id} 
              value={tag.id}
                 sx={{
                  backgroundColor: selectedTagIds.includes(tag.id) ? 'rgba(25, 118, 210, 0.2)' : 'inherit',
                  '&.Mui-selected': {
                  backgroundColor: 'rgba(25, 118, 210, 0.4)',
                  },
                  '&.Mui-selected:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.6)',
                  },
              }}
              >
              {tag.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};