import {Pipe, PipeTransform} from '@angular/core'
import {CartItem} from "../services/cart.service"

@Pipe({
  name: 'cartCount',
  standalone: true
})
export class CartCountPipe implements PipeTransform {

  transform(cart: CartItem[] | null): number {
    if (!cart) return 0
    return cart.reduce((acc, item) => acc + item.quantity, 0)
  }

}
