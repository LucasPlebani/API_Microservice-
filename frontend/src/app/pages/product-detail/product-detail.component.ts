import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../service/cart.service';
import { AuthService } from '../../service/auth.service';
import { Product } from '../../models/product.model';

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
      rating: 5,
    },
    {
      id: 2,
      name: 'Batteur électrique',
      price: 29.99,
      imageUrl: 'https://picsum.photos/200',
      description:
        'Un batteur électrique puissant pour toutes vos préparations.',
      store: 'Marmiton',
      rating: 5,
    },
    {
      id: 3,
      name: 'Item 3',
      price: 59.99,
      imageUrl: 'https://picsum.photos/200',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget ligula hendrerit, malesuada elit et, aliquet magna. Integer vitae gravida mauris. Sed ut aliquet sapien. Quisque semper sit amet metus non pretium. Nullam eget cursus tellus. In vitae odio sed ipsum hendrerit aliquet. Pellentesque at mauris vel lectus tincidunt finibus eget fringilla diam. Morbi egestas augue et purus luctus, et commodo urna sodales.',
      store: 'Magasin',
      rating: 2,
    },
    {
      id: 4,
      name: 'Item 4',
      price: 99.99,
      imageUrl: 'https://picsum.photos/200',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget ligula hendrerit, malesuada elit et, aliquet magna. Integer vitae gravida mauris. Sed ut aliquet sapien. Quisque semper sit amet metus non pretium. Nullam eget cursus tellus. In vitae odio sed ipsum hendrerit aliquet. Pellentesque at mauris vel lectus tincidunt finibus eget fringilla diam. Morbi egestas augue et purus luctus, et commodo urna sodales.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget ligula hendrerit, malesuada elit et, aliquet magna. Integer vitae gravida mauris. Sed ut aliquet sapien. Quisque semper sit amet metus non pretium. Nullam eget cursus tellus. In vitae odio sed ipsum hendrerit aliquet. Pellentesque at mauris vel lectus tincidunt finibus eget fringilla diam. Morbi egestas augue et purus luctus, et commodo urna sodales.',
      store: 'Magasin',
      rating: 2,
    },
    {
      id: 3,
      name: 'Item 3',
      price: 59.99,
      imageUrl: 'https://picsum.photos/200',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget ligula hendrerit, malesuada elit et, aliquet magna. Integer vitae gravida mauris. Sed ut aliquet sapien. Quisque semper sit amet metus non pretium. Nullam eget cursus tellus. In vitae odio sed ipsum hendrerit aliquet. Pellentesque at mauris vel lectus tincidunt finibus eget fringilla diam. Morbi egestas augue et purus luctus, et commodo urna sodales.',
      store: 'Magasin',
      rating: 2,
    },
    {
      id: 4,
      name: 'Item 4',
      price: 99.99,
      imageUrl: 'https://picsum.photos/200',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget ligula hendrerit, malesuada elit et, aliquet magna. Integer vitae gravida mauris. Sed ut aliquet sapien. Quisque semper sit amet metus non pretium. Nullam eget cursus tellus. In vitae odio sed ipsum hendrerit aliquet. Pellentesque at mauris vel lectus tincidunt finibus eget fringilla diam. Morbi egestas augue et purus luctus, et commodo urna sodales.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget ligula hendrerit, malesuada elit et, aliquet magna. Integer vitae gravida mauris. Sed ut aliquet sapien. Quisque semper sit amet metus non pretium. Nullam eget cursus tellus. In vitae odio sed ipsum hendrerit aliquet. Pellentesque at mauris vel lectus tincidunt finibus eget fringilla diam. Morbi egestas augue et purus luctus, et commodo urna sodales.',
      store: 'Magasin',
      rating: 2,
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.products.find((p) => p.id === this.productId);
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }

  addToCart(): void {
    if (!this.product) return;

    const userId = this.authService.getUserId();
    if (!userId) {
      alert('Vous devez être connecté pour ajouter un produit au panier.');
      return;
    }

    this.cartService.addToCart(userId, this.product).subscribe({
      next: () => alert('Produit ajouté au panier !'),
      error: (err) => {
        console.error('Erreur ajout panier', err);
        alert("Erreur lors de l'ajout au panier");
      },
    });
  }
}
