import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientdetailsComponent } from './clientdetails.component';

describe('ClientdetailsComponent', () => {
  let component: ClientdetailsComponent;
  let fixture: ComponentFixture<ClientdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
