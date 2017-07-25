import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {animate, transition, trigger, style} from "@angular/animations";

import "rxjs/add/observable/timer";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({transform: 'scale3d(.3, .3, .3)'}),
        animate(200)
      ]),
      transition('* => void', [
        animate(200, style({transform: 'scale3d(.0, .0, .0)'}))
      ])
    ])
  ]
})
export class DialogComponent implements OnInit {

  private timer;
  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit() {
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
