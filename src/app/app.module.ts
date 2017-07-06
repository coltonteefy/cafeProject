import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import {AppComponent} from './app.component';
import {HomePageComponent} from './home-page.component';
import {NavbarComponent} from './navbar.component';
import {AlertModule} from 'ngx-bootstrap';
import {RouterModule} from "@angular/router";

import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FooterComponent } from './footer.component';
import { DialogComponent } from './dialog.component';
import { LunchMenuComponent } from './lunch-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    FooterComponent,
    DialogComponent,
    LunchMenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CarouselModule.forRoot(),
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
        path: '**',
        redirectTo: '',
        pathMatch: 'prefix'
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent, NavbarComponent]
})
export class AppModule {
}
