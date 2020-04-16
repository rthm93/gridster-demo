import {
    Component,
    OnInit,
    ViewChild,
    HostListener,
    Type,
    Input,
    ComponentFactoryResolver,
} from '@angular/core';
import {
    GridsterConfig,
    GridsterItem,
    GridType,
    DisplayGrid,
    GridsterComponentInterface,
    GridsterItemComponentInterface,
    GridsterComponent,
} from 'angular-gridster2';
import { WidgetHostDirective } from './widget-host.directive';
import { FirstwidgetComponent } from './firstwidget/firstwidget.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    @ViewChild('grid', { static: true }) gridster: GridsterComponent;
    options: GridsterConfig;
    dashboard: Array<GridsterItem>;
    widgets: WidgetItem[];
    gridContainerHeight = 'calc(100vh - 10rem)';

    static itemResize(item, itemComponent) {
        // console.info('itemResized', item, itemComponent);
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.resizeContainer();
    }

    ngOnInit() {
        this.options = {
            itemChangeCallback: (
                item: GridsterItem,
                itemComponent: GridsterItemComponentInterface
            ) => {
                this.resizeContainer();
            },
            itemResizeCallback: AppComponent.itemResize,
            gridType: GridType.ScrollVertical,
            displayGrid: DisplayGrid.OnDragAndResize,
            pushItems: false,
            swap: true,
            margin: 10,
            compactType: 'compactUp&Left',
            draggable: {
                delayStart: 0,
                enabled: true,
                ignoreContentClass: 'gridster-item-content',
                ignoreContent: true,
                dragHandleClass: 'drag-handler',
                stop: (a, b, c) => {
                    // console.log('stop: ', a, b, c);
                },
                start: (a, b, c) => {
                    // console.log('start: ', a, b, c);
                },
                dropOverItems: false,
                dropOverItemsCallback: (a, b, c) => {
                    // console.log('dropOverItemsCallback: ', a, b, c);
                },
            },
            resizable: {
                enabled: false,
            },
            maxCols: 3,
            minCols: 3,
            minRows: 1,
            gridSizeChangedCallback: (gridster: GridsterComponentInterface) => {
                // console.log('gridSizeChangedCallback: ', gridster);
                // console.log(
                //     'gridSizeChangedCallback: ',
                //     `${gridster.curHeight}px`
                // );
                this.resizeContainer();
            },
        };

        this.dashboard = [
            { cols: 2, rows: 1, y: 0, x: 0 },
            { cols: 1, rows: 2, y: 0, x: 2 },
        ];

        this.widgets = [
            {
                component: FirstwidgetComponent,
                data: {
                    title: 'some title',
                    content: { message: 'some message' },
                },
                item: { cols: 1, rows: 1, y: 0, x: 1 },
            },
        ];
    }

    resizeContainer() {
        setTimeout(() => {
            if (this.gridster.mobile) {
                const values = [];

                for (const grid of this.gridster.grid) {
                    if (grid.el && grid.el.style && grid.el.style.height) {
                        values.push(grid.el.style.height);
                    }

                    if (
                        grid.el &&
                        grid.el.style &&
                        grid.el.style.marginBottom
                    ) {
                        values.push(grid.el.style.marginBottom);
                    }
                }

                this.gridContainerHeight = `calc(${
                    values.length > 1
                        ? `${values.join(' + ')}`
                        : values.length === 1
                        ? values[0]
                        : '0px'
                } + ${this.gridster.$options.margin * 2}px)`;
            } else {
                this.gridContainerHeight = `${
                    this.gridster.rows * this.gridster.curRowHeight +
                    this.gridster.$options.margin
                }px`;
            }
            console.log('resize containter: ', this.gridContainerHeight);
            console.log(this.gridster);
            this.options.api.resize();
        });
    }

    changedOptions() {
        this.options.api.optionsChanged();
    }

    removeItem(item) {
        this.dashboard.splice(this.dashboard.indexOf(item), 1);
    }

    addItem() {
        this.dashboard.push({ cols: 1, rows: 1, y: 0, x: 2 });
    }
}

@Component({
    selector: 'app-widget',
    template: ` <h3 *ngIf="config">{{ config.data.title || 'Title' }}</h3>
        <ng-template appWidgetHost></ng-template>`,
})
export class WidgetComponent {
    @ViewChild(WidgetHostDirective, { static: true })
    gridHost: WidgetHostDirective;
    config: WidgetItem;

    @Input() set item(value: WidgetItem) {
        this.config = value;
        this.renderWidget(value);
    }

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

    renderWidget(item: WidgetItem) {
        if (this.gridHost && item) {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
                item.component
            );

            const viewContainerRef = this.gridHost.viewContainerRef;
            viewContainerRef.clear();

            const componentRef = viewContainerRef.createComponent(
                componentFactory
            );

            (componentRef.instance as WidgetComponentInterface).data =
                item.data;
        }
    }
}

export interface WidgetData {
    title?: string;
    content: any;
}

export interface WidgetItem {
    component: Type<any>;
    data: WidgetData;
    item: GridsterItem;
}

export interface WidgetComponentInterface {
    data: WidgetData;
}
