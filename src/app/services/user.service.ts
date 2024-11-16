import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api/users'; // Cambia según tu configuración

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user).pipe(
      catchError(err => {
        // Manejar el error aquí
        return throwError(err);
      })
    );
  }



  login(userData: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData);
    }


  resetPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, { email }).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
  
  updatePassword(token: string | null, newPassword: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/update-password`, { token, newPassword });
}


}
