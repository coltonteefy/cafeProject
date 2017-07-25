import {Component, OnInit} from '@angular/core';
import {Kitchen} from "./kitchen";
import {KitchenService} from "./kitchen.service";

@Component({
  selector: 'kitchen-side-view',
  templateUrl: './kitchen-side-view.component.html',
  styleUrls: ['./kitchen-side-view.component.css'],
  providers: [KitchenService]
})
export class KitchenSideViewComponent implements OnInit {
  kitchen: Kitchen;
  kitchenItems: Kitchen[];

  constructor(private kitchenService: KitchenService) {
  }

  ngOnInit() {
    this.kitchenService.changes
      .subscribe((data: any) => {
        this.kitchenItems = data.kitchen;
      });
  }

  delete(id) {
    console.log(this.kitchenItems.length);
    console.log(this.kitchenItems);
    this.kitchenService.deleteFromKitchen(id);
  }
}
