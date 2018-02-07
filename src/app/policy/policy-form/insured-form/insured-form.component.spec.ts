import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuredFormComponent } from './insured-form.component';

describe('InsuredFormComponent', () => {
  let component: InsuredFormComponent;
  let fixture: ComponentFixture<InsuredFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuredFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuredFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
