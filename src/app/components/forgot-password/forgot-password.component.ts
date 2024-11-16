// forgot-password.component.ts
import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';
  message: string = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http
      .post('http://localhost:3000/api/users/forgot-password', { email: this.email })
      .subscribe({
        next: () => alert('Correo enviado con éxito. Revisa tu bandeja de entrada.'),
        error: (err) => {
          console.error('Error desde el servidor:', err);
          alert(err?.error?.message || 'Ocurrió un error inesperado.');
        }
      });
  }
}