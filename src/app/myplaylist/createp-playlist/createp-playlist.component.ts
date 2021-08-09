import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AngularFireStorage,
  AngularFireStorageReference,
} from '@angular/fire/storage';
import Swal from 'sweetalert2';
import { PlaylistService } from '../../service/playlist/playlist.service';
import { Router } from '@angular/router';
import { PlaylistReq } from '../../model/PlaylistReq';

@Component({
  selector: 'app-createp-playlist',
  templateUrl: './createp-playlist.component.html',
  styleUrls: ['./createp-playlist.component.css'],
})
export class CreatepPlaylistComponent implements OnInit {
  formCreatePlaylist: FormGroup = new FormGroup({});
  form: File;
  ref?: AngularFireStorageReference;
  downloadURL?: string;
  messageAlert: string;
  playlistReq: PlaylistReq;
  checkAvt: boolean;
  checkName: any;

  constructor(
    private afStorage: AngularFireStorage,
    private formBuilder: FormBuilder,
    private playlistService: PlaylistService,
    private router: Router
  ) {
    this.formCreatePlaylist = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onChangeAvatar(event: any) {
    this.form = event.target.files[0];
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);

    this.ref
      .put(this.form)
      .then((snapshot) => {
        return snapshot.ref.getDownloadURL();
      })
      .then((downloadURL) => {
        this.checkAvt = true;
        this.downloadURL = downloadURL;
        return downloadURL;
      })
      .catch((error) => {});
  }
  cretePlaylist() {
    const data = this.formCreatePlaylist.value;
    this.playlistReq = {
      name: data.name,
      avatarUrl: this.downloadURL,
    };

    this.playlistService.creatPlaylist(this.playlistReq).subscribe(
      (mes) => {
        Swal.fire({
          title: 'Compete',
          icon: 'success',
          confirmButtonColor: '#3bc8e7',
        });
        this.router.navigate(['']);
      },
      (error) => {
        this.messageAlert = error.message;
        Swal.fire({
          title: 'Error',
          text: 'Please check your infor !',
          icon: 'error',
          confirmButtonColor: '#3bc8e7',
        });
      }
    );
  }

  backHome() {
    this.router.navigate(['']);
  }
}
