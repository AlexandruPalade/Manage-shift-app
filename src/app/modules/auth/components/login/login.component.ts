import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage!: string;

  constructor(private authService: AuthService) {
    this.loginForm = new FormGroup({
      email: new FormControl(null),
      password: new FormControl(null),
    });
  }

  async onLoginClick() {
    const { email, password } = this.loginForm.value;

    this.authService.loginUser(email, password).subscribe(
      (error) => {
        this.errorMessage = error.errorMessage;
      }
    );
  }
}
