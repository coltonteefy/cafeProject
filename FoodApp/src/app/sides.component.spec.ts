import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidesComponent } from './sides.component.ts';

describe('SidesComponent', () => {
  let component: SidesComponent;
  let fixture: ComponentFixture<SidesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
