import { Song } from './Song';
import { User } from './User';
import {Playlist} from "./Playlist";
export interface CommentPlayList {
  id?: number;
  content?: string;
  user?: User;
  song?: Playlist;
  createdTime?: string;
}
