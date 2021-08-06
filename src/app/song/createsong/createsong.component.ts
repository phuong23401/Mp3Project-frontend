import {Component, OnInit} from '@angular/core';
import {SongService} from "../../service/song/song.service";
import {Song} from "../../model/Song";
import {User} from "../../model/User";
import {CategoryService} from "../../service/category/category.service";
import {Icategory} from "../../model/Icategory";
import {SingerService} from "../../service/singer/singer.service";
import {Singers} from "../../model/Singers";
import {Message} from "../../model/Message";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-createsong',
  templateUrl: './createsong.component.html',
  styleUrls: ['./createsong.component.css']
})
export class CreatesongComponent implements OnInit {

  status = 'Please fill in the form to create Song!'
  isCheckUploadAvatar = false;
  isCheckUploadFile = false;
 formavt:any={};
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
    author:""
  };
  mes: Message = {}
  form: any = {};
  categoriess: Icategory[] = [];
  singgers: Singers[] = [];
  user: User = {};
  singgersOnchage: Singers[] = [];
  newSinger: Singers;

  constructor(private songService: SongService,
              private categorySv: CategoryService,
              private singer: SingerService, private router: Router) {
    this.categorySv.getAllCategory().subscribe((categorySv: Icategory[]) => {
      this.categoriess = categorySv;
    })
    this.singer.getAllSinger().subscribe((singerSv: Singers[]) => {
      this.singgers = singerSv;

    })

  }

  ngOnInit(): void {
  }

  ngSubmit() {
    this.song.name = this.form.name;
    this.song.description = this.form.description;
    this.song.avatarUrl = this.formavt.avatarUrl;
    this.song.fileUrl = this.form.fileUrl;
    this.song.lyric = this.form.lyric;
    this.song.categories.id = this.form.categories;
    this.song.singer = this.singgersOnchage;
    this.song.author = this.form.author;
    console.log(this.song);
    this.songService.createSong(this.song).subscribe(data => {
      if (JSON.stringify(this.error1) == JSON.stringify(data)) {
        this.status = 'The avatar is required! Please select upload avatar';
        Swal.fire({
          title: this.status,
          icon: "error",
          confirmButtonColor: "#3bc8e7"
        });

      }
      if (JSON.stringify(this.error2) == JSON.stringify(data)) {
        this.status = 'The file is required! Please select upload file';
        Swal.fire({
          title: this.status,
          icon: "error",
          confirmButtonColor: "#3bc8e7"
        });
      }
      if (JSON.stringify(this.success) == JSON.stringify(data)) {
        this.status = 'Create success!';
        alert(this.status);
        // Swal.fire({
        //   title: this.status,
        //   icon: "success",
        //   confirmButtonColor: "#3bc8e7"
        // });
        this.router.navigate(['/song'])
        // this.form = {};
        // this.isCheckUploadAvatar = false;
        // this.isCheckUploadFile = false;
        // this.singgersOnchage.splice(0, this.singgersOnchage.length);

      }
    }
    ,error => {
      this.status = 'Fill in the form!';
      Swal.fire({
        title: this.status,
        icon: "error",
        confirmButtonColor: "#3bc8e7"
      });
        }
        )
    console.log(this.form);
  }

  onChangeAvatar(event: any) {
    this.formavt.avatarUrl = event;
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
        console.log(this.newSinger)
      })
    })
  }
}
