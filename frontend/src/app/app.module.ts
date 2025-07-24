import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'usuarios', pathMatch: 'full' }, // Ya NO redireccionamos al login
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'servicios', component: ServiciosComponent }
];




@NgModule({

declarations: [
AppComponent,
UsuariosComponent,
NavbarComponent,
ProductosComponent,
ServiciosComponent,
LoginComponent,
RegisterComponent
],

imports: [
BrowserModule,
FormsModule,
HttpClientModule,
RouterModule.forRoot(routes)
],
providers: [ ],
bootstrap: [AppComponent]
})
export class AppModule { }