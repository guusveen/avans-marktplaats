import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component'; // Import the ProductDetailComponent
import { InboxComponent } from './inbox/inbox.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create-product', component: ProductCreateComponent, canActivate: [AuthGuard] },
  { path: 'products/:id', component: ProductDetailComponent }, // Add the route for product details
  { path: 'products', component: ProductListComponent },
  { path: 'inbox', component: InboxComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/products', pathMatch: 'full' }
];

export { routes };