import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  products = [
    {
      id: 1,
      name: 'Moule à manqué',
      price: 19.99,
      imageUrl: 'https://picsum.photos/200',
      store: 'Marmiton',
    },
    {
      id: 2,
      name: 'Batteur électrique',
      price: 29.99,
      imageUrl: 'https://picsum.photos/200',
      store: 'Marmiton',
    },
    {
      id: 3,
      name: 'Item 3',
      price: 59.99,
      imageUrl: 'https://picsum.photos/200',
      store: 'Magasin',
    },
    {
      id: 4,
      name: 'Item 4',
      price: 99.99,
      imageUrl: 'https://picsum.photos/200',
      store: 'Magasin',
    },
  ];

  constructor(private router: Router) {}

  goToProductDetails(productId: number): void {
    console.log('Navigate to product details for ID:', productId);
    this.router.navigate(['/product', productId]);
  }
}
