import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {


  private timer;
  i = 0;
  foodPics = [
    // big table pizza
    'https://ahealthieryou.meijer.com/wp-content/uploads/2017/02/Cauliflower-Crust-Pizza.jpg',
    //chicken and red pepper
    'http://www.downtownromios.com/wp-content/uploads/2017/05/bianca.jpg',
    //supreme
    'https://assets-blog.fundera.com/assets/wp-content/uploads/2016/02/09134922/stoked-wood-fired-pizza-company.jpg',
    //close up
    'http://www.nunwood.com/wp-content/uploads/2015/03/Hot_pizza800x300.jpg',
    //cheese chicken slice
    'http://www.foodsaveurs.com/wp-content/uploads/2017/05/pizza-1-1200x450.jpeg',
    // tomato, pineapple, pepper
    'https://2erape3gkyv5ojcr3ljlepou-wpengine.netdna-ssl.com/wp-content/uploads/2017/03/012517_weekly-recipes_pizza.jpg'
  ];
  currentPic = this.foodPics[this.i];

  constructor() {
  }

  ngOnInit() {
    this.changePic();

    this.timer = Observable.timer(0, 5000).subscribe(t => {
      this.changePic();
    });
  }

  ngOnDestroy() {
    this.timer.unsubscribe();
  }
  changePic() {
    if (this.i >= (this.foodPics.length - 1)) {
      this.i = 0;
      this.currentPic = this.foodPics[this.i];
      // this.i = this.i + 1;
    } else {
      this.i = this.i + 1;
    }
    this.currentPic = this.foodPics[this.i];
  }

}
