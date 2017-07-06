import {Component, OnInit} from '@angular/core';
import { DialogComponent } from './dialog.component';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [DialogComponent]
})
export class HomePageComponent implements OnInit {

  private foodPic = 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjm9ISX4uPUAhWBdD4KHXJwCBUQjRwIBw&url=https%3A%2F%2Flos-angeles.eat24hours.com%2F&psig=AFQjCNFcS9uljZqdhFiJlZgbAkSMZTyU5g&ust=1498850176870458';
  private menuHeader = 'http://static1.squarespace.com/static/556ddd04e4b0975c0bb32168/556ddecfe4b0be322ef6b552/592d2dc85016e1bf41af32ff/1497951365818/Jackfruit-caesar-salad-7-banner.jpg?format=1000w';

  constructor() { }
  showDialog = false;

  ngOnInit() {
  }

  onClick() {

  }
}
