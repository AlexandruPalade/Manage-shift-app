import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftsHomeComponent } from './shifts-home.component';

describe('ShiftsHomeComponent', () => {
  let component: ShiftsHomeComponent;
  let fixture: ComponentFixture<ShiftsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
