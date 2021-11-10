import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementDialogComponent } from './engagement-dialog.component';

describe('EngagementDialogComponent', () => {
  let component: EngagementDialogComponent;
  let fixture: ComponentFixture<EngagementDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngagementDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EngagementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
