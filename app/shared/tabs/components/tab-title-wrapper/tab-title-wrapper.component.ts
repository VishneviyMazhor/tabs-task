import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'tab-title-wrapper',
  templateUrl: './tab-title-wrapper.component.html',
  styleUrls: ['./tab-title-wrapper.component.css']
})
export class TabTitleWrapperComponent implements OnInit {

  @Input() tab: any;
  @Output() onTabTitleClick: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }


}
