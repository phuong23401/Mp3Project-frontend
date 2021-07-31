
import {Singers} from './Singers';
import {Playlist} from './Playlist';
import {Icategory} from "./Icategory";
import {User} from "./User";

export interface Song {
  id?: number;
  name?: string;
  description?: string;
  tags?: string;
  avatarUrl?: string;
  fileUrl?: string;
  createTime?: any;
  updateTime?: any;
  countLike?: number;
  lyrics?: string;
  user?: User;
  category?: Icategory;
  singers?: Singers[];
  playlists?: Playlist[];


}
