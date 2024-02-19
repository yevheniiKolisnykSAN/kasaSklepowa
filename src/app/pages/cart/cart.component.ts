import {Component, inject, OnInit} from '@angular/core'
import {CartService} from "../../services/cart.service"
import {Product} from "../../models/product"
import {map, Observable} from "rxjs"
import {ProductsService} from "../../services/products.service"
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from "@angular/material/table"
import {AsyncPipe, CurrencyPipe} from "@angular/common"
import {MatButton} from "@angular/material/button"
import {MatFormField, MatInput, MatLabel} from "@angular/material/input"
import {DialogService} from "../../services/dialog.service"
import {SumPricePipe} from "../../pipes/sum-price.pipe"

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatRowDef,
    AsyncPipe,
    MatButton,
    MatInput,
    MatFormField,
    MatLabel,
    SumPricePipe,
    CurrencyPipe
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartService: CartService = inject(CartService)
  productsService: ProductsService = inject(ProductsService)
  dialogService: DialogService = inject(DialogService)

  $products: Observable<Product[]>

  displayedColumns: string[] = ['quantity', 'name', 'price', 'remove']

  ngOnInit() {
    const products = this.productsService.products.getValue()

    this.$products = this.cartService.cart.pipe(
      map(cart => {
        const filteredProducts = products.filter(product => cart.find(item => item.productId === product.id))
        return filteredProducts.map(product => {
          const cartItem = cart.find(item => item.productId === product.id)
          return {...product, quantity: cartItem!.quantity}
        })
      })
    )
  }

  async onQuantityChanged(product: Product, e: Event) {
    const target = (e.target as HTMLInputElement)
    const newQuantity = +target.value

    if (newQuantity < 1) {
      const result = await this.remove(product)
      if (!result) target.value = '1'
    } else {
      this.cartService.updateQuantity(product.id, newQuantity)
    }

  }

  async remove(product: Product): Promise<boolean> {
    const result = await this.dialogService.confirm(`Czy na pewno chcesz usunąć "${product.name}" z koszyka?`)
    if (!result) return false

    this.cartService.removeFromCart(product.id)
    return true
  }

  async submit() {
    const result = await this.dialogService.submit();
    if (result) this.cartService.clearAll()
  }
}
