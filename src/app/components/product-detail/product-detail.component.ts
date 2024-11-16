import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any = null; // Usamos 'any' para no definir un modelo
  newProduct: any = { // Usamos 'any' para no definir un modelo
    name: '',
    price: 0,
    description: '',
    category: '',
    stock: 0,
    imageUrl: ''
  };
  errorMessage: string = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(id).subscribe(
        (product) => {
          this.product = product;
        },
        (error) => {
          console.error('Error al obtener el producto', error);
        }
      );
    }
  }

  onSubmit(): void {
    this.productService.addProduct(this.newProduct).subscribe(
      () => {
        console.log('Producto creado con éxito');
        this.router.navigate(['/products']); // Redirigir a la lista de productos
      },
      (error) => {
        console.error('Error al crear el producto', error);
        this.errorMessage = 'Error al crear el producto. Intenta nuevamente.';
      }
    );
  }
}