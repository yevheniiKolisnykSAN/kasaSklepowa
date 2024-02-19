import {Component, inject, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../../models/product";
import {AsyncPipe, CurrencyPipe} from "@angular/common";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardTitle
} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {CartService} from "../../services/cart.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    AsyncPipe,
    HttpClientModule,
    MatCard,
    MatCardHeader,
    MatCardImage,
    MatCardTitle,
    MatButton,
    MatCardActions,
    MatCardContent,
    CurrencyPipe
  ],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit {
  http: HttpClient = inject(HttpClient)
  cartService: CartService = inject(CartService)
  snackBar: MatSnackBar = inject(MatSnackBar)

  $products: Observable<Product[]>

  ngOnInit() {
    this.$products = this.http.get<Product[]>('/assets/products.json')
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product)
    this.snackBar.open(`${product.name} został dodany do koszyka!`, 'Close', {duration: 2000})
  }
}
