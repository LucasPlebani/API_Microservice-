import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flash-sale-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flash-sale-card.component.html',
  styleUrl: './flash-sale-card.component.scss',
})
export class FlashSaleCardComponent {
  constructor(private router: Router) {}

  goToPromotions(): void {
    this.router.navigate(['/promotions']);
  }
}
