import { Component } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { Router } from '@angular/router';
import { FlashSaleCardComponent } from '../flash-sale-card/flash-sale-card.component';

@Component({
  selector: 'app-home',
  imports: [ProductsComponent, FlashSaleCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
