import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaladsComponent } from './salads.component.ts';

describe('SaladsComponent', () => {
  let component: SaladsComponent;
  let fixture: ComponentFixture<SaladsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaladsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaladsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
