// reset-password.component.ts
import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';
  token: string | null = null;
  message: string = '';

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
    // Obtener el token de la URL
    this.token = this.route.snapshot.queryParamMap.get('token');
  }

  onSubmit() {
    if (this.newPassword !== this.confirmPassword) {
      this.message = 'Las contraseñas no coinciden.';
      return;
    }

    this.userService.updatePassword(this.token, this.newPassword).subscribe(
      (response) => {
        this.message = 'Contraseña actualizada con éxito.';
        this.router.navigate(['/login']); // Redirigir al usuario a la página de inicio de sesión
      },
      (error) => {
        this.message = 'Error al actualizar la contraseña.';
      }
    );
  }
}
