import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(private authService: AuthService) {
    this.registerForm = new FormGroup({
      email: new FormControl(null, [
        Validators.email,
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&.])[A-Za-zd$@$!%*?&].{6,}'
        ),
        Validators.minLength(6),
      ]),
      firstName: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
      ]),
      age: new FormControl(null, [Validators.required, Validators.min(16)]),
    });
  }

  async onRegisterClick() {
    const { email, password } = this.registerForm.value;

    this.authService
      .registerUser(email, password, {
        ...this.registerForm.value,
      })
      .subscribe((data) => console.log('>>>>>>>>>', data));
  }

  getErrorMessageEmail() {
    if (this.registerForm?.hasError('required')) {
      return 'This field is required';
    }
    return this.registerForm?.hasError('pattern')
      ? ''
      : 'Pattern for email not respected';
  }

  getErrorMessagePassword() {
    if (this.registerForm?.hasError('required')) {
      return 'This field is required';
    }
    return this.registerForm?.hasError('pattern')
      ? ''
      : 'Uppercase,lowercase,1 number ,1 sepecial character,min length 6';
  }

  getErrorMessageFirstName() {
    if (this.registerForm?.hasError('required')) {
      return 'This field is required';
    }
    return this.registerForm?.hasError('minlength') ? '' : 'Min length 2';
  }

  getErrorMessageLastName() {
    if (this.registerForm?.hasError('required')) {
      return 'This field is required';
    }
    return this.registerForm?.hasError('pattern') ? '' : 'Min length 2';
  }

  getErrorMessageAge() {
    if (this.registerForm?.hasError('required')) {
      return 'This field is required';
    }
    return this.registerForm?.hasError('min') ? '' : 'At least 16 yeats old';
  }
}
