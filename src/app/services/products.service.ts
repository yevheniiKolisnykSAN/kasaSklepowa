import {inject, Injectable} from '@angular/core'
import {BehaviorSubject, firstValueFrom} from "rxjs"
import {Product} from "../models/product"
import {HttpClient} from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  http: HttpClient = inject(HttpClient)

  products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([])

  async init() {
    const products = await firstValueFrom(this.http.get<Product[]>('/assets/products.json'))
    this.products.next(products)
  }
}
