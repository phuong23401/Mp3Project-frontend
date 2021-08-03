
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
  createdTime?: any;
  updatedTime?: any;
  countLike?: number;
  lyric?: string;
  user?: User;
  categories?: any;
  singers?: Singers[];
  playlist?: Playlist[];
  numberOfView?: number;
  author?:string;



}
