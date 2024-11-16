import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onLogin(): void {
    this.errorMessage = '';

    this.userService.login({ email: this.email, password: this.password }).subscribe(
      () => {
        console.log('Inicio de sesión exitoso');
        this.router.navigate(['/products']); // Redirigir al dashboard o página principal
      },
      (error) => {
        console.error('Error al iniciar sesión', error);
        this.errorMessage = 'Correo o contraseña incorrectos.';
      }
    );
  }
}

