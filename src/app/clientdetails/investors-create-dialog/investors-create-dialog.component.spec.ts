import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorsCreateDialogComponent } from './investors-create-dialog';

describe('InvestorsCreateDialogComponent', () => {
  let component: InvestorsCreateDialogComponent;
  let fixture: ComponentFixture<InvestorsCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestorsCreateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorsCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
