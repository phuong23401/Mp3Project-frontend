import { Song } from "./Song";

export interface Playlist {
    name: string;
    avatarUrl: string;
    countLike: number;
    listen: number;
    songs: Song[];
}
