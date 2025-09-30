import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileIconSelector } from './profile-icon-selector';

describe('ProfileIconSelector', () => {
  let component: ProfileIconSelector;
  let fixture: ComponentFixture<ProfileIconSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileIconSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileIconSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
