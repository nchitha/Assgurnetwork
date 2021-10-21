import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditorQuesComponent } from './auditor-ques.component';

describe('AuditorQuesComponent', () => {
  let component: AuditorQuesComponent;
  let fixture: ComponentFixture<AuditorQuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditorQuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditorQuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
