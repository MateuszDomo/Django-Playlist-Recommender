import type { BaseModel } from "./BaseModel";
import type { Song } from "./Song";
import type { User } from "./User";

export interface Playlist extends BaseModel {
  name: string,
  songs: Song[],
  user: User,
}