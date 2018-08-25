import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHouseEventComponent } from './admin-house-event.component';

describe('AdminHouseEventComponent', () => {
  let component: AdminHouseEventComponent;
  let fixture: ComponentFixture<AdminHouseEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminHouseEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHouseEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
