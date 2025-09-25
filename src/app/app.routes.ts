import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Catalog } from './catalog/catalog';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'catalog', component: Catalog }
];