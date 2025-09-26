import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateFormControls } from './template-form-controls';

describe('TemplateFormControlsComponent', () => {
  let component: TemplateFormControls;
  let fixture: ComponentFixture<TemplateFormControls>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateFormControls ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateFormControls);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
