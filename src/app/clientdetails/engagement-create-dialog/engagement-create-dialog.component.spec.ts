import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementCreateDialogComponent } from './engagement-create-dialog.component';

describe('EngagementCreateDialogComponent', () => {
  let component: EngagementCreateDialogComponent;
  let fixture: ComponentFixture<EngagementCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngagementCreateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EngagementCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
