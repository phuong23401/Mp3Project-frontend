import { Component, OnInit } from '@angular/core';
import { SongService } from '../../service/song/song.service';
import { Song } from '../../model/Song';
import { User } from '../../model/User';
import { CategoryService } from '../../service/category/category.service';
import { Icategory } from '../../model/Icategory';
import { SingerService } from '../../service/singer/singer.service';
import { Singers } from '../../model/Singers';
import { Message } from '../../model/Message';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-createsong',
  templateUrl: './createsong.component.html',
  styleUrls: ['./createsong.component.css'],
})
export class CreatesongComponent implements OnInit {
  searchValue: any;
  status = 'Please fill in the form to create new song !';
  isCheckUploadAvatar = false;
  isCheckUploadFile = false;
  formavt: any = {};
  conditsion: boolean;
  listFilterResult: Singers[];
  songList: Singers[];
  isCheck = true;
  error1: any = {
    message: 'noavatar',
  };
  error2: any = {
    message: 'nomp3url',
  };
  error3: any = {
    message: 'noObj',
  };
  success: any = {
    message: 'Done',
  };
  song: Song = {
    name: '',
    description: '',
    avatarUrl: '',
    fileUrl: '',
    lyric: '',
    categories: {
      id: 0,
    },
    singer: [{ id: 0 }],
    author: '',
  };
  mes: Message = {};
  form: any = {};
  categoriess: Icategory[] = [];
  singgers: Singers[] = [];
  user: User = {};
  singgersOnchage: Singers[] = [];
  newSinger: Singers;
  searchForm: FormGroup;

  constructor(
    private songService: SongService,
    private categorySv: CategoryService,
    private singer: SingerService,
  ) {
    this.searchForm = new FormGroup({
      name: new FormControl(),
    });
    this.categorySv.getAllCategory().subscribe((categorySv: Icategory[]) => {
      this.categoriess = categorySv;
    });

    this.singer.getAllSinger().subscribe((singerSv: Singers[]) => {
      this.singgers = singerSv;
    });
  }

  ngOnInit(): void {
    this.singer.getAllSinger().subscribe((res) => {
      this.songList = res;
    });
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

    this.songService.createSong(this.song).subscribe(
      (data) => {
        if (JSON.stringify(this.error1) == JSON.stringify(data)) {
          this.status = 'Please upload avatar song !';
          Swal.fire({
            title: this.status,
            icon: 'error',
            confirmButtonColor: '#3bc8e7',
          });
        }
        if (JSON.stringify(this.error2) == JSON.stringify(data)) {
          this.status = 'Please select upload file mp3 !';
          Swal.fire({
            title: this.status,
            icon: 'error',
            confirmButtonColor: '#3bc8e7',
          });
        }
        if (JSON.stringify(this.success) == JSON.stringify(data)) {
          this.status = 'Create successfully !';
          Swal.fire({
            title: this.status,
            icon: 'success',
            confirmButtonColor: '#3bc8e7',
          });
          this.form.name = null;
          this.form.description = null;
          this.formavt.avatarUrl = null;
          this.form.fileUrl = null;
          this.form.lyric = null;
          this.form.categories = null;
          this.singgersOnchage = null;
          this.form.author = null;
          this.isCheckUploadFile = false;
          this.isCheckUploadAvatar = false;
        }
      },
      (error) => {
        this.status = 'Fill in the form !';
        Swal.fire({
          title: this.status,
          icon: 'error',
          confirmButtonColor: '#3bc8e7',
        });
      }
    );
  }

  onChangeAvatar(event: any) {
    this.formavt.avatarUrl = event;
    this.isCheckUploadAvatar = true;
  }

  onChangeFile(event: any) {
    this.form.fileUrl = event;
    this.isCheckUploadFile = true;
  }

  onchage(value: any) {
    this.singer.findSingerByName(value).subscribe(
      (data) => {
        this.singgersOnchage.push(data);
      },
      (error) => {
        this.newSinger = {
          name: value,
          description: 'Ca sỹ',
        };
        this.singer.createSinger(this.newSinger).subscribe((obj) => {
          this.singgersOnchage.push(obj);
        });
      }
    );
  }

  Search() {
    this.singgers = this.singgers.filter((res) => {
      return res.name.toLowerCase().match(this.searchValue.toLowerCase());
    });
  }

  filterKeyWord() {
    let filterResult = [];
    this.conditsion = true;
    this.isCheck = false;

    if (this.searchValue.length === 0) {
      this.isCheck = true;
    } else {
      this.listFilterResult = this.songList;
      let keyWord = this.searchValue.toLowerCase();
      this.listFilterResult.map((item) => {
        let name = item.name.toLowerCase();
        if (name.includes(keyWord)) {
          filterResult.push(item);
        }
      });
    }
    this.listFilterResult = filterResult;
    
    if (this.listFilterResult.length !== 0) {
      this.conditsion = true;
    } else {
      this.conditsion = false;
    }
  }
}
