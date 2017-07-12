import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {HomePageComponent} from './home-page.component';
import {NavbarComponent} from './navbar.component';
import {AlertModule} from 'ngx-bootstrap';
import {RouterModule} from "@angular/router";

import { FooterComponent } from './footer.component';
import { DialogComponent } from './dialog.component';
import { LunchMenuComponent } from './lunch-menu.component';
import { CartPageComponent } from './cart-page.component';



@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    FooterComponent,
    DialogComponent,
    LunchMenuComponent,
    CartPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AlertModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        component: HomePageComponent
      },
      {
        path: 'navbar',
        component: NavbarComponent
      },
      {
        path: 'lunch-menu',
        component: LunchMenuComponent
      },
      {
        path: 'cart-page',
        component: CartPageComponent
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'prefix'
      }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
