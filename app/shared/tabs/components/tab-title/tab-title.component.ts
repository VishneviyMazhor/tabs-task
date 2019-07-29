import {Component, TemplateRef, ViewChild} from '@angular/core';

@Component({
  selector: 'tab-title',
  templateUrl: './tab-title.component.html',
  styleUrls: ['./tab-title.component.css']
})
export class TabTitleComponent {

  @ViewChild('tabTitle', {read: TemplateRef}) templateRef: TemplateRef<any>;

  constructor() { }
}
