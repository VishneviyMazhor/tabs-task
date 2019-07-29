import {
    AfterContentInit, AfterViewChecked,
    AfterViewInit,
    Component, ComponentFactoryResolver, ComponentRef,
    ContentChildren, EmbeddedViewRef,
    OnDestroy,
    OnInit,
    QueryList,
    ViewChild, ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import 'rxjs/add/operator/takeUntil';
import {TabComponent} from "../tab/tab.component";
import {Subject} from "rxjs";
import {TabTitleWrapperComponent} from "../tab-title-wrapper/tab-title-wrapper.component";

@Component({
    selector: 'tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.css'],
    encapsulation: ViewEncapsulation.Native
})
export class TabsComponent implements OnInit, AfterViewInit, AfterContentInit, OnDestroy, AfterViewChecked {

    private _unsubscribeAll: Subject<any> = new Subject();

    @ContentChildren(TabComponent) private tabComponents: QueryList<TabComponent>;
    private tabComponentsOldMap: Map<TabComponent, {titleComponent: ComponentRef<TabTitleWrapperComponent>}> = new Map();
    private tabComponentsCurrent: { tab: TabComponent, tabContentRef: EmbeddedViewRef<any> };

    @ViewChild('tabTitles', {read: ViewContainerRef}) private tabTitlesContainer: ViewContainerRef;
    @ViewChild('tabContents', {read: ViewContainerRef}) private tabContentsContainer: ViewContainerRef;

    constructor(private resolver: ComponentFactoryResolver) {
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {

        this.renderTabs();

        this.tabComponents.changes
            .takeUntil(this._unsubscribeAll)
            .subscribe(() => this.renderTabs());

    }

    ngAfterContentInit(): void {
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    ngAfterViewChecked(): void {
    }

    renderTabs() {
        // TODO: as bonus could add order dependency for "add tab before" case
        const tabsComponentsArr = this.tabComponents.toArray();
        const tabsComponentsOldArr = Array.from(this.tabComponentsOldMap);
        const tabComponentsNew = tabsComponentsArr.filter((tabComponent: TabComponent) => !this.tabComponentsOldMap.has(tabComponent));
        const tabComponentsRemove = tabsComponentsOldArr.filter(([tabComponent]) => !tabsComponentsArr.includes(tabComponent));

        tabComponentsRemove.forEach(([tabComponent, meta]) => {
            this.tabComponentsOldMap.delete((tabComponent));
            meta.titleComponent.destroy();
            if (this.tabComponentsCurrent && this.tabComponentsCurrent.tab === tabComponent) {
                this.tabComponentsCurrent.tabContentRef.destroy();
                if (this.tabComponents.length) {
                    this.selectTab(this.tabComponents.first, this.tabComponentsOldMap.get(this.tabComponents.first).titleComponent);
                } else {
                    this.tabComponentsCurrent = null;
                }
            }
        });

        tabComponentsNew.forEach((tab: TabComponent) => {
            const titlesNodes = tab.tabTitle.templateRef.createEmbeddedView({}).rootNodes;
            const factory = this.resolver.resolveComponentFactory(TabTitleWrapperComponent);
            const titleWrapperComponent = this.tabTitlesContainer.createComponent(factory, null, this.tabTitlesContainer.injector, [
                titlesNodes
            ]);

            this.tabComponentsOldMap.set(tab, {
                titleComponent: titleWrapperComponent
            });

            titleWrapperComponent.location.nativeElement.classList.add('tabs__title');

            titleWrapperComponent.instance.onTabTitleClick.subscribe(() => {
                this.tabContentsContainer.clear();
                this.selectTab(tab, titleWrapperComponent);
            });

        });

        if (!this.tabComponentsCurrent && this.tabComponentsOldMap.size) {
            this.selectTab(this.tabComponents.first, this.tabComponentsOldMap.get(this.tabComponents.first).titleComponent);
        }
    }

    private selectTab(tab: TabComponent, title: ComponentRef<TabTitleWrapperComponent>) {
        this.tabComponentsCurrent = {
            tab,
            tabContentRef: this.tabContentsContainer.createEmbeddedView(tab.tabContent.templateRef)
        };

        this.tabComponentsOldMap.forEach(({titleComponent}) => {
            titleComponent.location.nativeElement.classList.remove('tabs__title--active');
        });
        title.location.nativeElement.classList.add('tabs__title--active');
    }
}
