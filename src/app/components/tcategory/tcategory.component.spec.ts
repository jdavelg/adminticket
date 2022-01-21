import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TcategoryComponent } from './tcategory.component';

describe('TcategoryComponent', () => {
  let component: TcategoryComponent;
  let fixture: ComponentFixture<TcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TcategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
