import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { SimpleElement } from '../../core/app.reducer';

@Component({
  selector: 'comp2',
  templateUrl: 'comp2.html'
})
export class Comp2Component implements OnInit {

  @Output() simpleElementChanged: EventEmitter<any> = new EventEmitter();
  @Output() complexElementChanged: EventEmitter<any> = new EventEmitter();

  @Input() element: SimpleElement;

  constructor() {
  }

  ngOnInit(): void {
  }

  onSimpleElementChanged($event) {
    console.log($event);
    this.simpleElementChanged.emit({
      elementIndex: this.element.elementIndex,
      value: $event.value
    });
  }

  onComplexElementChanged($event) {
    this.complexElementChanged.emit({
      elementIndex: this.element.elementIndex,
      value: $event.value
    });
  }

}
