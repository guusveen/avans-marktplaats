import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component'; // Importeer AppComponent
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component'; // Importeer de ProductDetailComponent
import { AuthGuard } from './services/auth.guard'; // Importeer de AuthGuard
import { InboxComponent } from './inbox/inbox.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create-product', component: ProductCreateComponent, canActivate: [AuthGuard] }, // Beveiligde route
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent }, // Voeg de route voor productdetails toe
  { path: 'inbox', component:InboxComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ProductCreateComponent,
    ProductListComponent,
    ProductDetailComponent, // Declareer de ProductDetailComponent
    InboxComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    CommonModule,
    AppComponent // Importeer AppComponent hier als standalone component
  ],
  providers: [AuthGuard], // Voeg AuthGuard toe aan providers
  bootstrap: [AppComponent]
})
export class AppConfigModule { } // Exporteer de module correct
