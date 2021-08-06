import { Song } from "./Song";

export interface Playlist {
    name?: string;
    avatarUrl?: string;
    songs: Song[];
}
