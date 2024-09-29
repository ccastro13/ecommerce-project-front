import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit(): void {
    // Aquí deberías realizar la autenticación
    // Si es exitosa, redirigir al usuario a la página deseada
    // Por ahora, simplemente redirigiremos a la lista de productos
    this.router.navigate(['/products']);
  }
}
