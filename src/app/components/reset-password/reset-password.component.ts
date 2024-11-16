// reset-password.component.ts
import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent {
  token: string = '';
  newPassword: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.token = this.route.snapshot.params['token']; // Capturar el token desde la URL
  }

  onSubmit() {
    this.http.post('http://localhost:3000/api/users/reset-password', {
      token: this.token,
      newPassword: this.newPassword,
    }).subscribe({
      next: () => {
        alert('Contraseña actualizada con éxito.');
        this.router.navigate(['/login']);
      },
      error: (err) => alert(err.error.message),
    });
  }

}
