import { Component } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { passwordMatchValidator } from '../../shared/password-match.directives';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForma = this.fb.group({
    fullName: ['', [Validators.required, Validators.pattern(/^([A-Z][a-z]+)(\s[A-Z][a-z]+)?\s([A-Z][a-z]+)\s([A-Z][a-z]+)$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)]],
    confirmPassword: ['', Validators.required],
  }, { validator: passwordMatchValidator });

  constructor(private fb: FormBuilder) {}

  get fullName() {
    return this.registerForma.controls['fullName']
  }

  get email() {
    return this.registerForma.controls['email'];
  }

  get password() {
    return this.registerForma.controls['password'];
  }

  get confirmPassword() {
    return this.registerForma.controls['confirmPassword'];
  }


}
