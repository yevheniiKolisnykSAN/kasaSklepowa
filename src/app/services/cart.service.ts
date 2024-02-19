import {Injectable} from '@angular/core'
import {Product} from "../models/product"
import {BehaviorSubject} from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([])

  init() {
    const cart = localStorage.getItem('cart')
    this.cart.next(cart ? JSON.parse(cart) : [])
  }

  addToCart(product: Product) {
    const cart = localStorage.getItem('cart')

    if (cart) {
      const cartItems: CartItem[] = JSON.parse(cart)
      const existingItem = cartItems.find(item => item.productId === product.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        cartItems.push({productId: product.id, quantity: 1})
      }
      localStorage.setItem('cart', JSON.stringify(cartItems))
      this.cart.next(cartItems)
    } else {
      localStorage.setItem('cart', JSON.stringify([{productId: product.id, quantity: 1}]))
      this.cart.next([{productId: product.id, quantity: 1}])
    }
  }


  removeFromCart(productId: string) {
    const cart = localStorage.getItem('cart')
    if (cart) {
      const cartItems: CartItem[] = JSON.parse(cart)
      const newCart = cartItems.filter(item => item.productId !== productId)
      localStorage.setItem('cart', JSON.stringify(newCart))
      this.cart.next(newCart)
    }
  }

  updateQuantity(productId: string, quantity: number) {
    const cart = localStorage.getItem('cart')
    if (cart) {
      const cartItems: CartItem[] = JSON.parse(cart)
      const existingItem = cartItems.find(item => item.productId === productId)
      if (existingItem) {
        existingItem.quantity = quantity
        localStorage.setItem('cart', JSON.stringify(cartItems))
        this.cart.next(cartItems)
      }
    }
  }

  clearAll() {
    localStorage.removeItem('cart')
    this.cart.next([])
  }
}


export interface CartItem {
  productId: string;
  quantity: number;
}
