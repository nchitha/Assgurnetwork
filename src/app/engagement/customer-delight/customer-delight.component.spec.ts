import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDelightComponent } from './customer-delight.component';

describe('CustomerDelightComponent', () => {
  let component: CustomerDelightComponent;
  let fixture: ComponentFixture<CustomerDelightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDelightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDelightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
