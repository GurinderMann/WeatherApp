import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {  Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  email: string = '';
  password: string = '';

  constructor(
    private authSrv: AuthService,
    private router:Router
    ) {}

  submitLogin(form: NgForm) {
    if (form.valid) {
      this.authSrv.login(this.email, this.password).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/']);

        },
        error => {
          console.error(error);

        }
      );
    }
  }
  toRegisterPage() {
    this.router.navigate(['register']);
  }
}
