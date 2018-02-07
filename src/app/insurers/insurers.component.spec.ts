import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurersComponent } from './insurers.component';

describe('InsurersComponent', () => {
  let component: InsurersComponent;
  let fixture: ComponentFixture<InsurersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsurersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsurersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
