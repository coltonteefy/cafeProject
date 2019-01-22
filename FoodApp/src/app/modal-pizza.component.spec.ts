import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPizzaComponent } from './modal-pizza.component.ts';

describe('ModalPizzaComponent', () => {
  let component: ModalPizzaComponent;
  let fixture: ComponentFixture<ModalPizzaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPizzaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPizzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
