import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  imports: [CommonModule],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  userId: string = '6839b840457411e525028257'; // TODO : remplacer par un id dynamique plus tard

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCart(this.userId).subscribe({
      next: (cart) => {
        console.log('Panier reçu :', cart);
        console.log('Items reçus :', cart.items);
        this.cartItems = cart.items || [];
      },
      error: (err) =>
        console.error('Erreur lors de la récupération du panier :', err),
    });
  }

  removeFromCart(item: any): void {
    const productId = item.product_id || item.id;
    this.cartService
      .removeFromCartInDataBase(this.userId, productId)
      .subscribe({
        next: () => {
          this.cartItems = this.cartItems.filter(
            (i) => i.product_id !== productId && i.id !== productId
          );
        },
        error: (err) => {
          console.error("Erreur lors de la suppression de l'article :", err);
        },
      });
  }
}
