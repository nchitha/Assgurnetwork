import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerReviewComponent } from './dealer-review.component';

describe('DealerReviewComponent', () => {
  let component: DealerReviewComponent;
  let fixture: ComponentFixture<DealerReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
