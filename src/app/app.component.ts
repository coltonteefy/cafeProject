import {Component, ElementRef, HostListener, Renderer2} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  innerWidth: number;

  constructor(private renderer2: Renderer2, private el: ElementRef) { }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.innerWidth = innerWidth;

    if(pageYOffset > 78 ) {
      this.renderer2.addClass(this.el.nativeElement.querySelector('#navList'), 'show');
    }
    else {
      this.renderer2.removeClass(this.el.nativeElement.querySelector('#navList'), 'show');
    }

    if(pageYOffset >= 495){
      this.renderer2.addClass(this.el.nativeElement.querySelector('#navList'), 'navbar-fixed');
      this.renderer2.addClass(this.el.nativeElement.querySelector('#body'), 'body-up');
      this.renderer2.addClass(this.el.nativeElement.querySelector('#menues'), 'body-up');
      this.renderer2.addClass(this.el.nativeElement.querySelector('#head'), 'header-change');
    }
    else{
      this.renderer2.removeClass(this.el.nativeElement.querySelector('#navList'), 'navbar-fixed');
      this.renderer2.removeClass(this.el.nativeElement.querySelector('#body'), 'body-up');
      this.renderer2.removeClass(this.el.nativeElement.querySelector('#menues'), 'body-up');
      this.renderer2.removeClass(this.el.nativeElement.querySelector('#head'), 'header-change');
    }

    if(this.innerWidth < 800 && this.innerWidth > 400){
      if(pageYOffset >= 221){
        this.renderer2.addClass(this.el.nativeElement.querySelector('#navList'), 'navbar-fixed');
        this.renderer2.addClass(this.el.nativeElement.querySelector('#body'), 'body-up');
        this.renderer2.addClass(this.el.nativeElement.querySelector('#menues'), 'body-up');
        this.renderer2.addClass(this.el.nativeElement.querySelector('#head'), 'header-change');
      }
      else{
        this.renderer2.removeClass(this.el.nativeElement.querySelector('#navList'), 'navbar-fixed');
        this.renderer2.removeClass(this.el.nativeElement.querySelector('#body'), 'body-up');
        this.renderer2.removeClass(this.el.nativeElement.querySelector('#menues'), 'body-up');
        this.renderer2.removeClass(this.el.nativeElement.querySelector('#head'), 'header-change');
      }
    }
    console.log(pageYOffset);
   }
}
