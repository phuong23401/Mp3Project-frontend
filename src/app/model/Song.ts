
import {Singers} from './Singers';
import {Icategory} from "./Icategory";
import {User} from "./User";
import { Playlist } from "./Playlist";

export interface Song {
  id?: number;
  name?: string;
  description?: string;
  tags?: string;
  avatarUrl?: string;
  fileUrl?: string;
  createdTime?: any;
  updatedTime?: any;
  countLike?: number;
  lyric?: string;
  user?: User;
  categories?: any;
  singer?: Singers[];
  playlist?: Playlist[];
  numberOfView?: number;
  author?:string;
}
