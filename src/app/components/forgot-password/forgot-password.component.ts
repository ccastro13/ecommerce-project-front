// forgot-password.component.ts
import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
  email: string = '';
  message: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.userService.resetPassword(this.email).subscribe(
      (response) => {
        this.message = 'Se ha enviado un enlace para restablecer la contraseña a tu correo.';
      },
      (error) => {
        this.message = 'Error: El correo no está registrado.';
      }
    );
  }
}