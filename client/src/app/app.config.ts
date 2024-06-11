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
import { AuthGuard } from './services/auth.guard';
import {OfferCreateComponent} from "./offer-create/offer-create.component";
import {OfferListComponent} from "./offer-list/offer-list.component"; // Importeer de AuthGuard

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create-product', component: ProductCreateComponent, canActivate: [AuthGuard] }, // Beveiligde route
  { path: 'products', component: ProductListComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ProductCreateComponent,
    ProductListComponent,
    OfferCreateComponent,
    OfferListComponent
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
