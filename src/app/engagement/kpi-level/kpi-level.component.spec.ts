import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiLevelComponent } from './kpi-level.component';

describe('KpiLevelComponent', () => {
  let component: KpiLevelComponent;
  let fixture: ComponentFixture<KpiLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KpiLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KpiLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
