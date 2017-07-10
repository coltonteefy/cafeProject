import {Component, OnDestroy, OnInit} from '@angular/core';
import {trigger, state, style,animate,transition} from "@angular/animations";

import "rxjs/add/observable/timer";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('shrinkOut', [
      state('in', style({height: '50px'})),
      state('out', style({height: '0px'})),
      transition('in => out', (animate('400ms ease-in-out'))),
      transition('out => in', (animate('400ms ease-in-out')))
      // transition('* => void', [
      //   style({height: '*'}),
      //   animate(250, style({height: 0}))]
      // )
    ])
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {


  private timer;
  private LOGO = './assets/upsLogo.gif';
  i = -1;
  menuState: string = 'out';
  foodPics = [
    //grill chesse and chicken
    'http://www.cincinnatimagazine.com/wp-content/uploads/sites/20/2015/03/CM_MAR15_FEATURE_T10_ABI1-e1425438722184.jpg',
    //table of everything
    'http://thenewlywedscookbook.com/wp-content/uploads/2015/01/homemade-blueberry-sauce-3-1000x600.jpg',
    //sandwich pile
    'https://static1.squarespace.com/static/55d25e52e4b075ba97049c9c/55d2786fe4b0ac4433e4c8cd/560aa0cde4b020611706a74a/1443537105903/panini-stack-min.jpg',
    //sandwich and pasta
    'http://cmzone.vzbqbxhynotw9ion96xv.netdna-cdn.com/wp-content/uploads/2016/09/back-to-biz-lunch-boxes-hero.jpg'
  ];
  currentPic = this.foodPics[this.i];



  constructor() { }

  ngOnInit() {
    // this.onWindowScroll();
    this.changePic();

    this.timer = Observable.timer(0,5000).subscribe(t => {
      this.changePic();
    })
  }

  ngOnDestroy() {
    this.timer.unsubscribe();
  }

  changePic(){
    if(this.i >= 3){
      this.i = -1;
      this.currentPic = this.foodPics[this.i];
      this.i = this.i + 1;
    }
    else
      this.i = this.i + 1;
      this.currentPic = this.foodPics[this.i];
  }

  // toggleMenu() {
  //   this.menuState = this.menuState === 'out' ? 'in' : 'out';
  //   console.log(this.menuState);
  // }
}
