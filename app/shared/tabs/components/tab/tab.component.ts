import {
  Component,
  ContentChild} from '@angular/core';
import {TabTitleComponent} from "../tab-title/tab-title.component";
import {TabContentComponent} from "../tab-content/tab-content.component";

@Component({
  selector: 'tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent {

  @ContentChild(TabTitleComponent) tabTitle: TabTitleComponent;
  @ContentChild(TabContentComponent) tabContent: TabContentComponent;

  constructor() { }

}
