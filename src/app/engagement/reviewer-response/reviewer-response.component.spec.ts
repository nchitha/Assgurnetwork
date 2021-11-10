import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewerResponseComponent } from './reviewer-response.component';

describe('ReviewerResponseComponent', () => {
  let component: ReviewerResponseComponent;
  let fixture: ComponentFixture<ReviewerResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewerResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewerResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
