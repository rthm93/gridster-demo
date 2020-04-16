import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Type } from '@angular/core';
import { GridsterModule } from 'angular-gridster2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent, WidgetComponent } from './app.component';
import { WidgetHostDirective } from './widget-host.directive';
import { FirstwidgetComponent } from './firstwidget/firstwidget.component';
import { BaseWidgetComponent } from './base-widget.component';

export const WIDGETS_COMPONENT_DEFINITIONS = [FirstwidgetComponent];
export const WIDGETS_DEFINITIONS = [
    { key: 'first', component: FirstwidgetComponent },
];

export function componentFilter(item: { key: string; component: Type<any> }) {
    return item.component;
}

@NgModule({
    declarations: [
        AppComponent,
        WidgetHostDirective,
        WidgetComponent,
        ...WIDGETS_COMPONENT_DEFINITIONS,
        BaseWidgetComponent,
    ],
    imports: [
        BrowserModule,
        GridsterModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [...WIDGETS_COMPONENT_DEFINITIONS],
})
export class AppModule {}
