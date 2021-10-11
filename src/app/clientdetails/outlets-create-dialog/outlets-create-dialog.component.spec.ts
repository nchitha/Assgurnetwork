import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutletsCreateDialogComponent } from './outlets-create-dialog.component';

describe('OutletsCreateDialogComponent', () => {
  let component: OutletsCreateDialogComponent;
  let fixture: ComponentFixture<OutletsCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutletsCreateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutletsCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
