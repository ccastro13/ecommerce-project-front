import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  fullName: string = '';
  email: string = '';
  city: string = '';
  phoneNumber: string = '';
  documentNumber: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = ''; 
  countdown: number = 10; 

  constructor(private userService: UserService, private router: Router) {}

  onSubmit(): void {
    this.errorMessage = ''; // Reinicia el mensaje de error al enviar

    if (this.password === this.confirmPassword) {
      this.userService.register({
        fullName: this.fullName,
        email: this.email,
        city: this.city,
        phoneNumber: this.phoneNumber,
        documentNumber: this.documentNumber,
        password: this.password,
      }).subscribe(
        () => {
          this.successMessage = 'Registro exitoso. Redirigiendo en 10 segundos...'; // Mensaje de éxito
          console.log('Usuario registrado con éxito');
          // Inicia la cuenta regresiva
          const countdownInterval = setInterval(() => {
            this.countdown--;
            if (this.countdown === 0) {
              clearInterval(countdownInterval);
              this.router.navigate(['/login']); // Redirigir a la página de login
            }
          }, 1000);
        },
        (error) => {
          console.error('Error al registrar el usuario:', error); // Imprime el error en la consola
          if (error.error && error.error.message) {
            this.errorMessage = error.error.message; // Muestra el mensaje de error específico
          } else {
            this.errorMessage = 'Error al registrar el usuario. Intenta nuevamente.';
          }
        }
      );
    } else {
      this.errorMessage = 'Las contraseñas no coinciden'; // Mensaje de error si las contraseñas no coinciden
      console.error(this.errorMessage);
    }
  }
}