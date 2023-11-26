import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchViewComponent } from './batch-view.component';

describe('BatchViewComponent', () => {
  let component: BatchViewComponent;
  let fixture: ComponentFixture<BatchViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BatchViewComponent]
    });
    fixture = TestBed.createComponent(BatchViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
