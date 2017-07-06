import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LunchMenuComponent } from './lunch-menu.component';

describe('LunchMenuComponent', () => {
  let component: LunchMenuComponent;
  let fixture: ComponentFixture<LunchMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LunchMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LunchMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
