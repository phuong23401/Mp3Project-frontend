import {Component, OnInit} from '@angular/core';
import {SongService} from "../../service/song/song.service";
import {Song} from "../../model/Song";
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-detail-song',
  templateUrl: './detail-song.component.html',
  styleUrls: ['./detail-song.component.css']
})
export class DetailSongComponent implements OnInit {

  id: number;
  song: Song;
  songList: Song[];
  playlist = [];
  audio: any;
  isPlaying = false;
  constructor(private songService: SongService,
              private routes: ActivatedRoute,) {
  }

  getSong() {
    this.routes.paramMap.subscribe(paramMap => {
      const id = +paramMap.get('id')
      this.songService.getSongsById(id).subscribe(res => {
        this.song = res;
      });
    })
  }

  getAllSong(){
    this.songService.getAllSongs().subscribe(res => {
      this.songList = res;
    })
  }

  ngOnInit(): void {
    this.getSong();
    this.getAllSong();
  }

  listenCount(song: Song) {
    this.isPlaying = !this.isPlaying;
    this.songService.getListenSongById(song.id).subscribe(data => {
      this.song = data;
    })

    const playlist = localStorage.getItem('playlist')
      ? JSON.parse(localStorage.getItem('playlist'))
      : [];
    const currentSong = {
      id: song.id,
      image: song.avatarUrl,
      title: song.name,
      artist: song.author,
      mp3: song.fileUrl,
    };
    localStorage.setItem('currentSong', JSON.stringify(currentSong));

    if (song !== undefined && !playlist.find((_song) => _song.id === song.id)) {
      playlist.unshift(currentSong);
      localStorage.setItem('playlist', JSON.stringify(playlist));
    }
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    music.Slider();
    // music.RTL();
    // music.Menu();
    // music.Player_close();
    // music.Popup();
    // music.Slider();
    // music.More();
    // music.Nice_select();
    // music.showPlayList();
    // music.volume();
  }
}
