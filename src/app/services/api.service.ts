import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:5000';  // URL del servidor Express

  constructor(private http: HttpClient) { }


  // Método para obtener la lista de productos del backend
  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`);

  }
}
