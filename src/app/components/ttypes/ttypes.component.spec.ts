import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtypesComponent } from './ttypes.component';

describe('TtypesComponent', () => {
  let component: TtypesComponent;
  let fixture: ComponentFixture<TtypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TtypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
