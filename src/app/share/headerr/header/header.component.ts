import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { LoginDialogComponent } from '../../login-dialog/login-dialog.component';
import {FormBuilder, FormGroup} from "@angular/forms";
import {SongService} from "../../../service/song/song.service";
import {Router} from "@angular/router";
import {query} from "@angular/animations";
import { RegisterDialogComponent } from '../../register-dialog/register-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchForm: FormGroup;

  constructor(private modalService: BsModalService,
              private songService: SongService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      nameSearch: ['']
    });
  }

  login() {
    this.modalService.show(LoginDialogComponent)
  }

  register() {
    this.modalService.show(RegisterDialogComponent)
  }

  search(){
    this.router.navigate(['/search'],{ queryParams: { name: this.searchForm.value.nameSearch } })
  }
}
