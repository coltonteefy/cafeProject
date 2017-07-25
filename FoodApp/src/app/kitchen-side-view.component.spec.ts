import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenSideViewComponent } from './kitchen-side-view.component';

describe('KitchenSideViewComponent', () => {
  let component: KitchenSideViewComponent;
  let fixture: ComponentFixture<KitchenSideViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KitchenSideViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitchenSideViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
