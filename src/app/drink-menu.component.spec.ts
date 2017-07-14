import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinkMenuComponent } from './drink-menu.component';

describe('DrinkMenuComponent', () => {
  let component: DrinkMenuComponent;
  let fixture: ComponentFixture<DrinkMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrinkMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrinkMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
