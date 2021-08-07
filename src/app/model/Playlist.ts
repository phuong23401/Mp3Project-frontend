import { Song } from "./Song";

export interface Playlist {
    id?:number;
    name?: string;
    avatarUrl?: string;
    countLike?: number;
    listen?: number;
    songs?: Song[];
}
