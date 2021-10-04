import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealersCreateDialogComponent } from './dealers-create-dialog.component';

describe('DealersCreateDialogComponent', () => {
  let component: DealersCreateDialogComponent;
  let fixture: ComponentFixture<DealersCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealersCreateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealersCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
