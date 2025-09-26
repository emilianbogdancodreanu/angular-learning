import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignIn } from './sign-in';

describe('SignInComponent', () => {
  let component: SignIn;
  let fixture: ComponentFixture<SignIn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignIn],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignIn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
