import { Component } from '@angular/core';
import { BaseWidgetComponent } from '../base-widget.component';

@Component({
    selector: 'app-firstwidget',
    templateUrl: './firstwidget.component.html',
    styleUrls: ['./firstwidget.component.css'],
})
export class FirstwidgetComponent extends BaseWidgetComponent {
    constructor() {
        super();
        console.log(FirstwidgetComponent);
    }
}
