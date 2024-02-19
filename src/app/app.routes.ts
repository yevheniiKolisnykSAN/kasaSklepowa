import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: 'catalog', pathMatch: 'full'},
  {path: 'catalog', loadComponent: () => import('./pages/catalog/catalog.component').then(c => c.CatalogComponent)},
  {path: 'cart', loadComponent: () => import('./pages/cart/cart.component').then(c => c.CartComponent)},
];
