import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignDeviceRecordsComponent } from './assign-device-records.component';

describe('AssignDeviceRecordsComponent', () => {
  let component: AssignDeviceRecordsComponent;
  let fixture: ComponentFixture<AssignDeviceRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignDeviceRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignDeviceRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
