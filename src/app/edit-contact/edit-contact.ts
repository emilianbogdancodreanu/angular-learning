import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts/contacts.service';
import { addressTypeValues, phoneTypeValues } from '../contacts/contact.model';
import { restrictedWords } from '../validators/restricted-words.validator';
import { DateValueAccessorDirective } from '../date-value-accessor/date-value-accessor.directive';
import { ProfileIconSelector } from '../profile-icon-selector/profile-icon-selector';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  imports: [CommonModule, ReactiveFormsModule, DateValueAccessorDirective, ProfileIconSelector],
  templateUrl: './edit-contact.html',
  styleUrls: ['./edit-contact.css']
})
export class EditContact implements OnInit {
  phoneTypes = phoneTypeValues;
  addressTypes = addressTypeValues;
  fb = new FormBuilder();
  contactForm = this.fb.nonNullable.group({
    id: '',
    icon: '',
    personal: false,
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: '',
    dateOfBirth: <Date | null>null,
    favoritesRanking: <number | null>null,
    phones: this.fb.array([this.createPhoneGroup()]),
    addresses: this.fb.array([this.createAddressGroup()]),
    notes: ['', restrictedWords(['foo', 'bar'])]
  });

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactsService,
    private router: Router) { }

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId)
      return;

    this.contactService.getContact(contactId).subscribe((contact) => {
      if (!contact) return;

      for (let i = 1; i < contact.phones.length; i++) {
        this.addPhone();
      }

      for (let i = 1; i < contact.addresses.length; i++) {
        this.addAddress();
      }

      this.contactForm.setValue(contact);
    });
  }

  get firstName() {
    return this.contactForm.controls.firstName;
  }

  get notes() {
    return this.contactForm.controls.notes;
  }

  stringifyCompare(a: any, b: any) {
    return JSON.stringify(a) == JSON.stringify(b);
  }

  createPhoneGroup() {
    const phoneGroup = this.fb.nonNullable.group({
      phoneNumber: '',
      phoneType: '',
      preferred: false
    });

    phoneGroup.controls.preferred.valueChanges
      .pipe(distinctUntilChanged(this.stringifyCompare))
      .subscribe(value => {
        if (value)
          phoneGroup.controls.phoneNumber.addValidators([Validators.required]);
        else
          phoneGroup.controls.phoneNumber.removeValidators([Validators.required]);
        phoneGroup.controls.phoneNumber.updateValueAndValidity();
      });

    return phoneGroup;
  }

  createAddressGroup() {
    const addressGroup = this.fb.nonNullable.group({
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
      addressType: ['', Validators.required]
    });

    addressGroup.valueChanges
      .pipe(distinctUntilChanged(this.stringifyCompare))
      .subscribe(() => {
        for (const controlName in addressGroup.controls) {
          addressGroup.get(controlName)?.removeValidators([Validators.required]);
          addressGroup.get(controlName)?.updateValueAndValidity();
        }
      });

    addressGroup.valueChanges
      .pipe(debounceTime(2000), distinctUntilChanged(this.stringifyCompare))
      .subscribe(() => {
        for (const controlName in addressGroup.controls) {
          addressGroup.get(controlName)?.addValidators([Validators.required]);
          addressGroup.get(controlName)?.updateValueAndValidity();
        }
      });

    return addressGroup;
  }

  addPhone() {
    this.contactForm.controls.phones.push(this.createPhoneGroup());
  }

  addAddress() {
    this.contactForm.controls.addresses.push(this.createAddressGroup());
  }

  saveContact() {
    this.contactService.saveContact(this.contactForm.getRawValue()).subscribe(() => {
      this.router.navigate(['/contact-list']);
    });
  }
}
