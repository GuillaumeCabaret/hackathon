import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Connect4Component } from './connect4.component';

describe('Connect4Component', () => {
  let component: Connect4Component;
  let fixture: ComponentFixture<Connect4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Connect4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Connect4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
