import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  myForm: FormGroup;
  successMessage: string = "";
  errorMessage: string = "";

  constructor(private formBuilder: FormBuilder, private authSvc: AuthService, private router: Router) {

    this.myForm = this.formBuilder.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passVerify: ['', Validators.required],
      genere: ['', Validators.required],
      profile: ['', Validators.required],
      bio: [''],
      username: ['', Validators.required],
    });
  }

  ngOnInit() {}




  submit() {
    // checking if the form is valid
    if (this.myForm.valid) {
      const { username, password, email } = this.myForm.value;

      this.authSvc.register(username, password, email).subscribe(
        response => {
          console.log(response);
          this.myForm.reset();
          this.errorMessage = '';
          this.successMessage = 'Registration successful. You can now login.';
        },
        error => {
          console.error(error);
          this.errorMessage = 'An error occurred during registration.';
          this.successMessage = '';
        }
      );
    } else {
      this.myForm.markAllAsTouched();
    }
  }
  // route to the login page
  toLoginPage() {
    this.router.navigate(['login']);
  }
}
