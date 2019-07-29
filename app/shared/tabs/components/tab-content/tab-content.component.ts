import {Component, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'tab-content',
  templateUrl: './tab-content.component.html',
  styleUrls: ['./tab-content.component.css']
})
export class TabContentComponent implements OnInit {

  @ViewChild('tabContent', {read: TemplateRef}) templateRef: TemplateRef<any>;

  constructor() { }

  ngOnInit() {

  }

}
