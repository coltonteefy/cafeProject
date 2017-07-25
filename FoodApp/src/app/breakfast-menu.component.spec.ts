import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakfastMenuComponent } from './breakfast-menu.component';

describe('BreakfastMenuComponent', () => {
  let component: BreakfastMenuComponent;
  let fixture: ComponentFixture<BreakfastMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreakfastMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakfastMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
