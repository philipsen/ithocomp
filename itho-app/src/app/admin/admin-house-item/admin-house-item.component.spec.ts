import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHouseItemComponent } from './admin-house-item.component';

describe('AdminHouseItemComponent', () => {
  let component: AdminHouseItemComponent;
  let fixture: ComponentFixture<AdminHouseItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminHouseItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHouseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
