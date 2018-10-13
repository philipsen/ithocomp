import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IthoStateComponent } from './itho-state.component';

describe('IthoStateComponent', () => {
  let component: IthoStateComponent;
  let fixture: ComponentFixture<IthoStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IthoStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IthoStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
