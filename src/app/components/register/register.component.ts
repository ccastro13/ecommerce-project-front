import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  fullName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  city: string = '';
  phoneNumber: string = '';
  documentNumber: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit(): void {
    if (this.password === this.confirmPassword) {
      const userData = {
        fullName: this.fullName,
        email: this.email,
        password: this.password,
        city: this.city,
        phoneNumber: this.phoneNumber,
        documentNumber: this.documentNumber
      };

      this.userService.register(userData).subscribe(
        () => {
          console.log('Usuario registrado con éxito');
          this.router.navigate(['/login']); // Redirigir a la página de login
        },
        (error) => {
          console.error('Error al registrar el usuario', error);
        }
      );
    } else {
      console.error('Las contraseñas no coinciden');
    }
  }
}


