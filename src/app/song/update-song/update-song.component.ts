import {Component, OnInit} from '@angular/core';
import {Message} from "../../model/Message";
import {Icategory} from "../../model/Icategory";
import {Singers} from "../../model/Singers";
import {User} from "../../model/User";
import {SongService} from "../../service/song/song.service";
import {CategoryService} from "../../service/category/category.service";
import {SingerService} from "../../service/singer/singer.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Song} from "../../model/Song";
import Swal from "sweetalert2";

@Component({
  selector: 'app-update-song',
  templateUrl: './update-song.component.html',
  styleUrls: ['./update-song.component.css']
})
export class UpdateSongComponent implements OnInit {

  status = 'Please fill in the form to create Song!'
  isCheckUploadAvatar = false;
  isCheckUploadFile = false;
  // formavt: any = {};
  error1: any = {
    message: "noavatar"
  }
  error2: any = {
    message: "nomp3url"
  }
  error3: any = {
    message: "noObj"
  }
  success: any = {
    message: "Done"
  }
  songImage: Song;

  song: Song = {
    name: "",
    description: "",
    avatarUrl: "",
    fileUrl: "",
    lyric: "",
    categories: {
      id: 0
    },
    singer: [
      {id: 0}
    ],
    author: ""
  };
  mes: Message = {}
  form: any = {};
  categoriess: Icategory[] = [];
  singgers: Singers[] = [];
  user: User = {};
  singgersOnchage: Singers[] = [];
  newSinger: Singers;
  id: any;
  check = false;

  constructor(private songService: SongService,
              private categorySv: CategoryService,
              private singer: SingerService, private router: Router, private activeRouter: ActivatedRoute) {
    this.categorySv.getAllCategory().subscribe((categorySv: Icategory[]) => {
      this.categoriess = categorySv;
    });
    this.singer.getAllSinger().subscribe((singerSv: Singers[]) => {
      this.singgers = singerSv;
    });
    this.activeRouter.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
    });
    this.songService.getSongById(this.id).subscribe((data: Song) => {
      this.songImage = data;
    });
  }


  ngOnInit(): void {

  }

  ngSubmit() {
    this.song.name = this.form.name;
    this.song.description = this.form.description;
    this.song.avatarUrl = this.form.avatarUrl;
    this.song.fileUrl = this.form.fileUrl;
    this.song.lyric = this.form.lyric;
    this.song.categories.id = this.form.categories;
    this.song.singer = this.singgersOnchage;
    this.song.author = this.form.author;
    console.log(this.song);
    this.songService.updateSong(this.id,this.song).subscribe(data => {
      if (JSON.stringify(this.success) == JSON.stringify(data)) {
        this.status = 'Create success!';
        Swal.fire({
          title: this.status,
          icon: "success",
          confirmButtonColor: "#3bc8e7"
        });
        this.router.navigate(['/song']);

      }
    }, error => {
      this.status = 'Orrer 500';
      Swal.fire({
        title: this.status,
        icon: "error",
        confirmButtonColor: "#3bc8e7"
      });
    })
    console.log(this.form);
  }

  onChangeAvatar(event: any) {
    this.form.avatarUrl = event;
    // this.isCheckUploadAvatar = true;
  }

  onChangeFile(event: any) {
    this.form.fileUrl = event;
    // this.isCheckUploadFile = true;
  }

  onchage(value: any) {
    this.singer.findSingerByName(value).subscribe(data => {
      this.singgersOnchage.push(data);
      console.log(this.newSinger)
    }, error => {
      this.newSinger = {
        name: value,
        description: "Ca sỹ"
      }
      this.singer.createSinger(this.newSinger).subscribe((obj) => {
        this.singgersOnchage.push(obj);
        console.log(this.newSinger);
      })
    })
  }
}
