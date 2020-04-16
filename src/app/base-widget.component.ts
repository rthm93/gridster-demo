import { Component, Input } from '@angular/core';
import { WidgetComponentInterface, WidgetData } from './app.component';

@Component({
    template: ``,
})
export class BaseWidgetComponent implements WidgetComponentInterface {
    @Input() data: WidgetData;
}
