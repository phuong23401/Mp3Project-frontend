import { Song } from "./Song";
import {User} from "./User";

export interface PlaylistResponse {
  id?:any;
  name?: string;
  avatarUrl?: string;
  createdTime?: any;
  updatedTime?: any
  countLike?: number;
  listen?: number;
  user: User
  songs?: Song[];
}
