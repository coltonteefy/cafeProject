import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {HomePageComponent} from './home-page.component';
import {NavbarComponent} from './navbar.component';
import {AlertModule} from 'ngx-bootstrap';
import {RouterModule} from "@angular/router";

import {FooterComponent} from './footer.component';
import {DialogComponent} from './dialog.component';
import {CartPageComponent} from './cart-page.component';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {DrinkMenuComponent} from './drink-menu.component';
import {UserService} from "./services/user.service";
import {UserRegistrationComponent} from "./user-registration-login.component";
import {KitchenSideViewComponent} from './kitchen-side-view.component';
import {ValidateService} from "./services/validate.service";
import {HeaderComponent} from './header.component';
import {SaladsComponent} from './salads.component';
import {SidesComponent} from './sides.component';
import {PizzaComponent} from './pizza.component';
import {ModalPizzaComponent} from './modal-pizza.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    FooterComponent,
    DialogComponent,
    CartPageComponent,
    DrinkMenuComponent,
    UserRegistrationComponent,
    KitchenSideViewComponent,
    HeaderComponent,
    SaladsComponent,
    SidesComponent,
    PizzaComponent,
    ModalPizzaComponent
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
        path: 'home-page',
        component: HomePageComponent
      },
      {
        path: 'navbar',
        component: NavbarComponent
      },
      {
        path: 'cart-page',
        component: CartPageComponent
      },
      {
        path: 'salads',
        component: SaladsComponent
      },
      {
        path: 'drink-menu',
        component: DrinkMenuComponent
      },
      {
        path: 'sides',
        component: SidesComponent
      },
      {
        path: 'pizza',
        component: PizzaComponent
      },
      {
        path: 'user-registration',
        component: UserRegistrationComponent
      },
      {
        path: 'kitchen-side-view',
        component: KitchenSideViewComponent
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'prefix'
      }
    ]),
  ],
  providers: [UserService, ValidateService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
