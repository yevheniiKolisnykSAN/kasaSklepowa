import {inject, Injectable} from '@angular/core';
import {CartService} from "./cart.service";
import {ProductsService} from "./products.service"

@Injectable({
  providedIn: 'root',
})
export class InitService {
  cartService: CartService = inject(CartService)
  productsService: ProductsService = inject(ProductsService)

  async init() {
    return await Promise.all([this.cartService.init(), this.productsService.init()])
  }
}
