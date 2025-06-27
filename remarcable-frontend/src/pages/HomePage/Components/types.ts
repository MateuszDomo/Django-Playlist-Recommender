import type { Song } from "../../../models/Song"

export type SongFilters = { 
  genreIds?: string[],
  tagIds?: string[],
  search?: string,
}

export type SongDetailDialogState =
  | { dialogOpen: true; song: Song }
  | { dialogOpen: false; song: null };