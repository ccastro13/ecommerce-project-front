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
  passwordError: boolean = false;
  passwordErrorMessage: string = '';

  constructor(private userService: UserService, private router: Router) { }

  onPasswordChange(): void {

    this.validatePassword(); // Ejecuta la validación de la contraseña
  }

  validatePassword(): void {
    
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,12}$/;

    if (!passwordRegex.test(this.password)) {
      this.passwordError = true;
      this.passwordErrorMessage =
        'La contraseña debe tener entre 6 y 12 caracteres, al menos una mayúscula y un símbolo.';
    } else {
      this.passwordError = false;
      this.passwordErrorMessage = '';
    }
  }


  formValid(): boolean {
    return (
      this.fullName.trim() !== '' &&
      this.email.trim() !== '' &&
      this.city.trim() !== '' &&
      this.phoneNumber.trim() !== '' &&
      this.documentNumber.trim() !== '' &&
      this.password.trim() !== '' &&
      this.confirmPassword.trim() !== '' &&
      this.password === this.confirmPassword &&
      !this.passwordError // La contraseña debe ser válida
    );
  }

  onSubmit(): void {
    this.errorMessage = ''; // Reinicia el mensaje de error
  
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
          console.log('Usuario registrado con éxito');
          alert('Registro exitoso. Redirigiendo al inicio de sesión...');
          this.router.navigate(['/login']); // Redirigir al inicio de sesión
        },
        (error) => {
          console.error('Error al registrar el usuario', error);
          if (error.status === 400) { //(documento o correo ya registrado)
            if (error.error && error.error.message) {
              // Verifica el mensaje específico del error
              if (error.error.message.includes('email')) {
                this.errorMessage = 'El correo electrónico ya está registrado.';
              } else if (error.error.message.includes('documentNumber')) {
                this.errorMessage = 'El número de documento ya está registrado.';
              } else {
                this.errorMessage = 'El documento o el correo ya están registrados.';
              }
            } else {
              this.errorMessage = 'El documento o el correo ya están registrados.';
            }
          } else {
            this.errorMessage = 'Error al registrar el usuario. Intenta nuevamente.';
          }
        }
      );
    } else {
      this.errorMessage = 'Las contraseñas no coinciden.';
      console.error(this.errorMessage);
    }
  }
}