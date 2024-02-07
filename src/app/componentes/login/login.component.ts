import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForma = this.fb.group({
    email: ['',[Validators.required, Validators.email]],
    password: ['', [Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)]]
  });

  constructor(private fb: FormBuilder, 
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router) {

  }

  get email() {
    return this.loginForma.controls['email'];
  }

  get password() {
    return this.loginForma.controls['password'];
  }

  login() {
    const {email, password} = this.loginForma.value;

    this.authService.getUserByEmail(email as string).subscribe(
      response => {
        if(response.length > 0 && response[0].password === password) {
          sessionStorage.setItem("email", email as string);
          this.router.navigate(['home']);
          this.messageService.add({ 
            severity: 'success', 
            summary: 'Estas Logeado', 
            detail: 'Ingresaste correctamente' });
        } else {
          this.messageService.add({ 
            severity: 'error', 
            summary: 'Error cuenta usuario', 
            detail: 'Contraseña o Email incorrectos' });
        }
      },
      error =>{
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Error cuenta usuario', 
          detail: 'Contraseña o Email incorrectos' });
      }
    );
  }

}
