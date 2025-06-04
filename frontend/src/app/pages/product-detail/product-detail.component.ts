import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  store: string;
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {
  productId!: number;
  product: Product | undefined;

  products: Product[] = [
    {
      id: 1,
      name: 'Moule à manqué',
      price: 19.99,
      imageUrl: 'https://picsum.photos/200',
      description: 'Un moule à manqué parfait pour vos gâteaux moelleux.',
      store: 'Marmiton',
    },
    {
      id: 2,
      name: 'Batteur électrique',
      price: 29.99,
      imageUrl: 'https://picsum.photos/200',
      description:
        'Un batteur électrique puissant pour toutes vos préparations.',
      store: 'Marmiton',
    },
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.products.find((p) => p.id === this.productId);
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}
