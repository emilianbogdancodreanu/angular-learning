import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts/contacts.service';
import { addressTypeValues, phoneTypeValues } from '../contacts/contact.model';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-contact.html',
  styleUrls: ['./edit-contact.css']
})
export class EditContact implements OnInit {
  phoneTypes = phoneTypeValues;
  addressTypes = addressTypeValues;
  fb = new FormBuilder();
  contactForm = this.fb.nonNullable.group({
    id: '',
    personal: false,
    firstName: '',
    lastName: '',
    dateOfBirth: <Date | null>null,
    favoritesRanking: <number | null>null,
    phone: this.fb.nonNullable.group({
      phoneNumber: '',
      phoneType: ''
    }),
    address: this.fb.nonNullable.group({
      streetAddress: '',
      city: '',
      state: '',
      postalCode: '',
      addressType: ''
    }),
    notes: ''
  });

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactsService,
    private router: Router) { }

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return;

    this.contactService.getContact(contactId).subscribe((contact) => {
      if (!contact) return;

      this.contactForm.setValue(contact);
    });
  }

  saveContact() {
    this.contactService.saveContact(this.contactForm.getRawValue()).subscribe(() => {
      this.router.navigate(['/contact-list']);
    });
  }
}
