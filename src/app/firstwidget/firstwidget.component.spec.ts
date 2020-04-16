import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstwidgetComponent } from './firstwidget.component';

describe('FirstwidgetComponent', () => {
  let component: FirstwidgetComponent;
  let fixture: ComponentFixture<FirstwidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstwidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstwidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
