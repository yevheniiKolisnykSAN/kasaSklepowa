import { Pipe, PipeTransform } from '@angular/core';
import {Product} from "../models/product"

@Pipe({
  name: 'sumPrice',
  standalone: true
})
export class SumPricePipe implements PipeTransform {

  transform(product: Product): number {
    return product.price * product.quantity!;
  }

}
