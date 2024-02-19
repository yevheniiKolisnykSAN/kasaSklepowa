import {Component, inject} from '@angular/core'
import {MatAnchor} from "@angular/material/button"
import {RouterLink} from "@angular/router"
import {CartService} from "../../services/cart.service"
import {AsyncPipe} from "@angular/common"
import {CartCountPipe} from "../../pipes/cart-count.pipe"

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatAnchor,
    RouterLink,
    AsyncPipe,
    CartCountPipe,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  cartService: CartService = inject(CartService)
}
