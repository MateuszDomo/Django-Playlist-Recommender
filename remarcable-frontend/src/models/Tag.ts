import type { BaseModel } from "./BaseModel";

export interface Tag extends BaseModel {
  name: string,
  userCreated: boolean,
}