import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Catalog } from './catalog/catalog';
import { Cart } from './cart/cart';
import { SignIn } from './user/sign-in/sign-in';
import { TemplateFormControls } from './template-form-controls/template-form-controls';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'catalog', component: Catalog },
  { path: 'cart', component: Cart },
  { path: 'sign-in', component: SignIn },
  { path: 'form-controls', component: TemplateFormControls },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];