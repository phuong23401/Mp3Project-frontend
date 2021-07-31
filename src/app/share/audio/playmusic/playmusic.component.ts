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
  totalAudioLength : any;

  isAudioPlaying = false;
  isRepeat = false;
  isMute = false;
  isError = false;
  currentAudioIndex = 0;
  repeatActive = false;
  audioList: Audio[] =[];
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
    })
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
  ngOnInit(): void {
    this.options();

  }

}
