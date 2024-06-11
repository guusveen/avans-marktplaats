import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AuthGuard } from './services/auth.guard';
import {OfferListComponent} from "./offer-list/offer-list.component";
import {OfferCreateComponent} from "./offer-create/offer-create.component";

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create-product', component: ProductCreateComponent, canActivate: [AuthGuard] },
  { path: 'products', component: ProductListComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'offer', component: OfferListComponent },
  { path: 'create-offer', component: OfferCreateComponent }
];

export { routes };
