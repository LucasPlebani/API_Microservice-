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
  userId: string = '1'; // TODO : remplacer par un id dynamique plus tard

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCart(this.userId).subscribe({
      next: (cart) => {
        console.log('Panier reçu :', cart);
        this.cartItems = cart.items || [];
      },
      error: (err) =>
        console.error('Erreur lors de la récupération du panier :', err),
    });
  }
}
