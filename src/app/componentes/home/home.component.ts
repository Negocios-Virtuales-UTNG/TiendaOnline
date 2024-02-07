import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})



export class HomeComponent {

  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private messageService: MessageService,
    private router: Router) {}
  
  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
    this.messageService.add({ 
      severity: 'info', 
      summary: 'Sesion Cerrada', 
      detail: 'Se ha cerrado la sesión' });
  }
}
