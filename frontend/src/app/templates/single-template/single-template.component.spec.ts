import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTemplateComponent } from './single-template.component';

describe('SingleTemplateComponent', () => {
  let component: SingleTemplateComponent;
  let fixture: ComponentFixture<SingleTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
