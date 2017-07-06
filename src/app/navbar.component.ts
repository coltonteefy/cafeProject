import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {trigger, state, style,animate,transition} from "@angular/animations";

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
export class NavbarComponent implements OnInit {

  menuState: string = 'out';

  private LOGO = './assets/upsLogo.gif';
  // private headImg1 = 'https://ak8.picdn.net/shutterstock/videos/22362667/thumb/4.jpg';
  // private headImg2 = 'http://www.tamron.eu/fileadmin/user_upload/magazin/moody-food/moody-food_header_grafiken.jpg';
  // private headImg3 = 'https://t4.ftcdn.net/jpg/01/35/33/47/240_F_135334771_keMi6dpGt0l35mcuf1C12QgiwYZj5yCf.jpg';
  // private headImg4 = 'http://www.dinemarket.com/uploads/8/9/4/3/89432208/dm-banner-main-img-04_orig.jpg';
  private headImg5 = 'https://www.nycemeal.com/assets/images/banner-5-mobile.jpg';
  private headImg6 = 'http://www.ohsu.edu/xd/about/services/food-and-nutrition/where-to-eat/images/Nutrition%20Home%20page%20banner--homepagebanner.jpg';
  private headImg7 = 'http://www.fyp365.com/wp-content/uploads/2017/06/fyp-banner-4.jpg';
  private youTube = 'https://youtu.be/PCZLNg_ze_M';




  constructor(private renderer2: Renderer2, private el: ElementRef) { }


  ngOnInit() {
    // this.onWindowScroll();
  }

  toggleMenu() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
    console.log(this.menuState);
  }
}
