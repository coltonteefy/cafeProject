import {Component, OnInit, ElementRef, Renderer2} from '@angular/core';
import {Kitchen} from "./kitchen";
import {KitchenService} from "./kitchen.service";

@Component({
  selector: 'kitchen-side-view',
  templateUrl: './kitchen-side-view.component.html',
  styleUrls: ['./kitchen-side-view.component.css'],
  providers: [KitchenService]
})
export class KitchenSideViewComponent implements OnInit {
  kitchen:Kitchen;
  kitchenItems:Kitchen[];
  empty:boolean;
  descripArray = [];
  deleteBtn: boolean = true;


  constructor(private kitchenService:KitchenService,
              private el:ElementRef,
              private renderer2: Renderer2) {
  }

  ngOnInit() {
    this.kitchenService.changes
      .subscribe((data:any) => {
        this.descripArray = [];
        this.kitchenItems = data.kitchen;
        this.isEmpty(this.kitchenItems.map(item => item));
        // console.log(this.kitchenItems.map(item => item));
      });
  }

  delete(id) {
    console.log(this.kitchenItems.length);
    console.log(this.kitchenItems);
    console.log(this.kitchenService.deleteFromKitchen(id));
    this.kitchenService.deleteFromKitchen(id);
  }

  isEmpty(kitchen:any) {
    this.empty = kitchen.length <= 0;
  }
  
  // trackByFn(index, item) {
  //   console.log("id " + item.id + " index " + index);
  //   return item.id;
  // }
}

