import { Song } from './Song';
import { User } from './User';
export interface Commentsong {
    id?: number;
    content?: string;
    user?: User;
    song?: Song;
    createdTime?: string;
  }
