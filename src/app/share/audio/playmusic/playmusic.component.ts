import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DataService} from "../../dataTrans/data.service";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {Audio} from "../audio.service";

@Component({
  selector: 'app-playmusic',
  templateUrl: './playmusic.component.html',
  styleUrls: ['./playmusic.component.css']
})
export class PlaymusicComponent implements OnInit {


  constructor( private  data: DataService,
               private router: Router) { }
  audioVolume = 100;
  isAudioEnded = new Subject();
  currentAudioTime = 0;
  totalAudioLength : any;
  isAudioLoaded = false;
  isAudioPlaying = false;
  isRepeat = false;
  isMute = false;
  isError = false;
  currentAudioIndex = 0;
  repeatActive = false;
  audioList: Audio[] =[];
  selectedAudio: Audio = {
    id: null,
    url: '',
    cover: 'http://www.jplayer.org/audio/mp3/TSP-07-Cybersonnet.mp3',
    title: 'Welcome',
    artist: 'MTV-K'
  };
  @Input() next = true;
  @Input() previous = true;
  @Input() shuffle = true;
  @Input() repeat = true;

  @Output() playEvent = new EventEmitter();
  @Output() pauseEvent = new EventEmitter();
  @Output() nextEvent = new EventEmitter();
  @Output() previousEvent = new EventEmitter();
  @Output() shuffleEvent = new EventEmitter();
  @Output() seekEvent = new EventEmitter();
  @Output() repEvent = new EventEmitter();
  @ViewChild('audioPlayer',{static: true}) audioPlayer!: ElementRef;

  //bắt sự kiện play
  options():void{
    this.audioPlayer.nativeElement.addEventListener('playing',() =>{
      this.isAudioPlaying = true;
    });
    // emit when intial loading of audio
    this.audioPlayer.nativeElement.addEventListener('loadeddata', () => {
      this.isAudioLoaded = true;
      this.getAudioLength();
    });
    // emit time on playing audio
    this.audioPlayer.nativeElement.addEventListener('timeupdate', () => {
      // get current audio time
      this.currentAudioTime = Math.floor(this.audioPlayer.nativeElement.currentTime);
      // check if audio is ended for next song and pass data to componet
      if (this.audioPlayer.nativeElement.ended) {
        this.isAudioEnded.next(true);
      }
    });
    this.audioPlayer.nativeElement.addEventListener('volumechange', () => {
      this.audioVolume = Math.floor(this.audioPlayer.nativeElement.volume * 100);
      if (this.audioVolume === 0) {
        this.isMute = true;
      }
    });
  }
  getAudioLength(): any {
    this.totalAudioLength = Math.floor(this.audioPlayer.nativeElement.duration);
  }
  play():any{
    this.isAudioPlaying = true;
    setTimeout(() =>{
      this.audioPlayer.nativeElement.play();
      this.playEvent.emit();
    },0)
  }
  pause(): any {
    // toggle play-pause button
    this.isAudioPlaying = false;
    // pause when user click pause button
    setTimeout(() => {
      this.audioPlayer.nativeElement.pause();
      this.pauseEvent.emit();
    }, 50);
  }
  initiateAudioPlayer(): any {
    if (this.audioList.length <= 0) {
      this.isError = true;
    } else {
      this.selectedAudio = this.audioList[this.currentAudioIndex];
    }
  }

  loadDataMusic(): any {
    this.data.currentAlbum.subscribe(album => {
      if (album !== null && album !== []) {
        this.audioList = album;
        console.log(this.audioList);
        this.initiateAudioPlayer();
      }
    });
    this.data.currentData.subscribe(index => {
      if (index !== null) {
        this.currentAudioIndex = index;
        console.log(this.currentAudioIndex);
      }
    });
  }
  ngOnInit(): void {
    this.options();
    this.loadDataMusic();

  }

}
