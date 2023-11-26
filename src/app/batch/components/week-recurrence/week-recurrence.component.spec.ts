import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekRecurrenceComponent } from './week-recurrence.component';

describe('WeekRecurrenceComponent', () => {
  let component: WeekRecurrenceComponent;
  let fixture: ComponentFixture<WeekRecurrenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeekRecurrenceComponent]
    });
    fixture = TestBed.createComponent(WeekRecurrenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
