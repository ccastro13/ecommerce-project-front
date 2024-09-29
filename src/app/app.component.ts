import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  products: any[] = [];  // Aquí almacenaremos los productos

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    // Llamamos al servicio para obtener los productos cuando se carga el componente
    this.apiService.getProducts().subscribe(
      (data) => {
        this.products = data;  // Asignamos los productos recibidos a la variable
      },
      (error) => {
        console.error('Error al obtener los productos', error);
      }
    );
  }
}
