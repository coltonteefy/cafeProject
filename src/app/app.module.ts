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
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { BreakfastMenuComponent } from './breakfast-menu.component';
import { DrinkMenuComponent } from './drink-menu.component';
import { UserService } from "./services/user.service";
import {UserRegistrationComponent} from "./user-registration-login.component";



@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    FooterComponent,
    DialogComponent,
    LunchMenuComponent,
    CartPageComponent,
    BreakfastMenuComponent,
    DrinkMenuComponent,
    UserRegistrationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
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
        path: 'breakfast-menu',
        component: BreakfastMenuComponent
      },
      {
        path: 'drink-menu',
        component: DrinkMenuComponent
      },
      {
        path: 'user-registration',
        component: UserRegistrationComponent
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'prefix'
      }
    ]),
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
