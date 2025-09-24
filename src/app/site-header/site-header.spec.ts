import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteHeader } from './site-header';

describe('SiteHeaderComponent', () => {
  let component: SiteHeader;
  let fixture: ComponentFixture<SiteHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteHeader ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
