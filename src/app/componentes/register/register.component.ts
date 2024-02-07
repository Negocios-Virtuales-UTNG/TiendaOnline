import { Component } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { passwordMatchValidator } from '../../shared/password-match.directives';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from '../../interfaces/user';

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

  constructor(private fb: FormBuilder, 
    private auth: AuthService,
    private router: Router,
    private messageService: MessageService) {}

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

  enviarRegistro() {
    const data = {...this.registerForma.value}

    delete data.confirmPassword

    this.auth.registerUser(data as User).subscribe(
      response => {console.log(response),
      this.messageService.add({ 
        severity: 'success', 
        summary: 'Registro Exitoso', 
        detail: 'Se ha registrado satisfactoriamente' });
        this.router.navigate(['login']);
      },
      error => console.log(error),
    )
  }


}
