import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerOutletsComponent } from './dealer-outlets.component';

describe('DealerOutletsComponent', () => {
  let component: DealerOutletsComponent;
  let fixture: ComponentFixture<DealerOutletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerOutletsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerOutletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
