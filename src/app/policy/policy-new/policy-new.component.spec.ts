import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyNewComponent } from './policy-new.component';

describe('PolicyNewComponent', () => {
  let component: PolicyNewComponent;
  let fixture: ComponentFixture<PolicyNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
