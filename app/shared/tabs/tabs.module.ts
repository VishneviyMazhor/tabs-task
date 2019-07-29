import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabsComponent} from './components/tabs/tabs.component';
import {TabTitleComponent} from './components/tab-title/tab-title.component';
import {TabContentComponent} from './components/tab-content/tab-content.component';
import {TabComponent} from './components/tab/tab.component';
import { TabTitleWrapperComponent } from './components/tab-title-wrapper/tab-title-wrapper.component';

@NgModule({
    declarations: [
        TabsComponent,
        TabTitleComponent,
        TabContentComponent,
        TabComponent,
        TabTitleWrapperComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        TabsComponent,
        TabTitleComponent,
        TabContentComponent,
        TabComponent
    ],
    entryComponents: [TabTitleWrapperComponent]
})
export class TabsModule {
}
