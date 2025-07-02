import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../service/cart.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  imports: [CommonModule],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  userId: string | null = null;
  total: number = 0;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    if (!this.userId) {
      console.error('Utilisateur non connecté ou ID manquant');
      return;
    }

    this.cartService.getCart(this.userId).subscribe({
      next: (cart) => {
        console.log('Panier reçu :', cart);
        console.log('Items reçus :', cart.items);
        this.cartItems = cart.items || [];
        this.calculateTotal();
      },
      error: (err) =>
        console.error('Erreur lors de la récupération du panier :', err),
    });
  }

  removeFromCart(item: any, index: number): void {
    const productId = item.product_id || item.id;
    this.cartService
      .removeFromCartInDataBase(this.userId!, productId)
      .subscribe({
        next: () => {
          // Supprimer seulement l'élément à l'index donné
          this.cartItems.splice(index, 1);
          this.cartItems = [...this.cartItems];
          this.calculateTotal();
        },
        error: (err) => {
          console.error("Erreur lors de la suppression de l'article :", err);
        },
      });
  }

  private calculateTotal(): void {
    this.total = this.cartItems.reduce((acc, item) => {
      return acc + item.price * item.volume;
    }, 0);
  }
}
