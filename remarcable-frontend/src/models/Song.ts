import type { Artist } from "./Artist";
import type { BaseModel } from "./BaseModel";
import type { Genre } from "./Genre";
import type { Tag } from "./Tag";

export interface Song extends BaseModel {
  name: string,
  genre: Genre,
  artist: Artist,
  description: string,
  tags: Tag[],
}