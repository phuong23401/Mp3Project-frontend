import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { LoginService } from 'src/app/service/login/login.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

declare var Swal: any;

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  register(){
    const user = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      username: this.registerForm.value.username,
      password: this.registerForm.value.password
    };
    console.log(user);
    this.loginService.register(user).subscribe(res => {
      if (res.message != null) {
        // @ts-ignore
        document.querySelector('.register_dialog').remove()
        // @ts-ignore
       document.querySelector('.modal-backdrop').remove()
       document.body.classList.remove('modal-open')
       this.modalService.show(LoginDialogComponent);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: res.message,
        });
      }
    });
  }
}
