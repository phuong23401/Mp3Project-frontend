import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireStorage, AngularFireStorageReference} from "@angular/fire/storage";
import {PlaylistReq} from "../../model/PlaylistReq";
import {PlaylistService} from "../../service/playlist/playlist.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import Swal from "sweetalert2";
import {PlaylistResponse} from "../../model/PlaylistResponse";

@Component({
  selector: 'app-update-playlist',
  templateUrl: './update-playlist.component.html',
  styleUrls: ['./update-playlist.component.css']
})
export class UpdatePlaylistComponent implements OnInit {

  formCreatePlaylist: FormGroup = new FormGroup({});
  form: File;
  ref?: AngularFireStorageReference;
  downloadURL?: string;
  messageAlert:string;
  playlist: PlaylistReq;

  checkAvt: boolean;
  checkName: any;
  id:any;
  oldPlaylist:PlaylistResponse;
  checkPlaylist =true;
  message1:any={
    name:"successfully!"
  }
  message2:any={
    name:"NoAvatar"
  }
status ="";
  constructor(private afStorage: AngularFireStorage,
              private formBuilder: FormBuilder,
              private playlistService: PlaylistService,
              private router: Router,
              private activerouter:ActivatedRoute) {
    this.activerouter.paramMap.subscribe((paraMap:ParamMap)=>{
      this.id = paraMap.get('id');
    })
    this.formCreatePlaylist = this.formBuilder.group({
      name: ['', [Validators.required]],
    })
    this.playlistService.getPlaylist(this.id).subscribe((data:PlaylistResponse)=>{
      this.oldPlaylist = data;
    })
    this.checkPlaylist = false;
  }

  ngOnInit(): void {
  }
  onChangeAvatar(event: any) {
    this.form = event.target.files[0];

    const id = Math.random().toString(36).substring(2)
    this.ref = this.afStorage.ref(id);
    this.ref.put(this.form).then(snapshot => {
      return snapshot.ref.getDownloadURL();
    })
      .then(downloadURL => {
        this.checkAvt = true;
        this.downloadURL = downloadURL;
        return downloadURL;
      })
      .catch(error=>{
        // console.log(`Failed to upload avatar and get link ${error}`);
      })
  }
  updatePlaylist(){
    const data = this.formCreatePlaylist.value;
    console.log(this.downloadURL)
    this.playlist = ({
      name: data.name,
      avatarUrl: this.downloadURL
    });
    this.playlistService.updatePlaylist(this.id,this.playlist).subscribe(mes => {
      if (JSON.stringify(this.message1) == JSON.stringify(mes)) {
        this.status = 'Successfully !';
        Swal.fire({
          title: this.status,
          icon: "success",
          confirmButtonColor: "#3bc8e7"
        });
        this.checkPlaylist = true;
        this.router.navigate(['/playlist']);
      }
      if (JSON.stringify(this.message2) == JSON.stringify(mes)) {
        this.status = 'please fill in avatar !';
        Swal.fire({
          title: this.status,
          icon: "error",
          confirmButtonColor: "#3bc8e7"
        });
      }
    }, error => {
      this.status = "Please check your infor !";
      Swal.fire({
        title: "Error",
        text: this.status,
        icon: "error",
        confirmButtonColor: "#3bc8e7"
      });
    });
  }
  cant(){
this.router.navigate(['/playlist'])
  }
}
