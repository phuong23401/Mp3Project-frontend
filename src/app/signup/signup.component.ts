import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../service/login/login.service';

declare var Swal: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup = new FormGroup({});
  form: any = {
    username: null,
    password: null
  };


  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  // tslint:disable-next-line:typedef
  register(){
    const user = {
      name: this.signupForm.value.name,
      email: this.signupForm.value.email,
      username: this.signupForm.value.username,
      password: this.signupForm.value.password
    };
    console.log(user);
    this.loginService.register(user).subscribe(res => {
      if (res.message != null) {
        this.router.navigate(['/signin']);
        // @ts-ignore
        document.querySelector('.modal-backdrop').remove()
        document.body.classList.remove('modal-open')
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
