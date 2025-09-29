import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContact } from './edit-contact';

describe('EditContactComponent', () => {
  let component: EditContact;
  let fixture: ComponentFixture<EditContact>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditContact]
    });
    fixture = TestBed.createComponent(EditContact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
